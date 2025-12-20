import { Box, selectClasses, Typography } from "@mui/material";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, Input, Option, Select, Step, StepButton, StepIndicator, Stepper, Textarea } from "@mui/joy";
import { Check, FileOpen, KeyboardArrowDown } from "@mui/icons-material";
import FilePicker from "../components/FilePicker";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import SubmissionStatus from "../components/SubmissionStatus";
import { uploadImage } from "../services/cloudinary";

const steps = ['type et details', 'Preuves et pieces justificatives', 'Vos coordonnées (Confidentiel)'];

function FormSignal() {
    const [activeStep, setActiveStep] = useState(0);
    const [proofs, setProofs] = useState([]);
    const { user, setUser } = useAuth();

    const [type, setType] = useState("");
    const [customType, setCustomType] = useState("");
    const [existingTypes, setExistingTypes] = useState(["Phishing", "Hack de compte", "Faux vendeurs / Faux acheteurs", "Colis bloqué"]);
    const [scammerName, setScammerName] = useState("");
    const [contact, setContact] = useState("");
    const [description, setDescription] = useState("");

    const [fullName, setFullName] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const res = await api.get("/signalements");
                if (Array.isArray(res.data)) {
                    const types = res.data.map(s => s.type);
                    const uniqueTypes = [...new Set([...existingTypes, ...types])].filter(t => t);
                    setExistingTypes(uniqueTypes);
                }
            } catch (err) {
                console.error("Erreur lors de la récupération des types:", err);
            }
        };
        fetchTypes();
    }, []);

    useEffect(() => {
        if (user) {
            setFullName(user?.name || "");
            setCity(user?.ville || "");
            setEmail(user?.email || "");
            setPhone(user?.phone || "");
        }
    }, [user]);

    const handleAddProofs = (files) => {
        if (proofs.length + files.length > 6) return;

        setProofs(prev => [...prev, ...files].slice(0, 6));
    };

    const handleSUbmit = async () => {
        if (!user) {
            alert("Vous devez être connecté pour signaler une arnaque.");
            return;
        }

        try {
            setIsSubmitting(true);

            // 1. Upload des images sur Firebase
            const uploadedUrls = [];
            if (proofs.length > 0) {
                console.log("Upload des images en cours...");
                for (const file of proofs) {
                    try {
                        const url = await uploadImage(file);
                        if (url) uploadedUrls.push(url);
                    } catch (err) {
                        console.error("Erreur upload fichier:", file.name, err);
                        alert(`Erreur lors de l'envoi de l'image ${file.name}`);
                        setIsSubmitting(false);
                        return;
                    }
                }
            }

            const finalType = type === "Autre" ? customType : type;

            // 2. Préparation des données (JSON)
            const payload = {
                nom: scammerName,
                contact: contact,
                description: description,
                titre: "Arnaque sur " + finalType + " " + city,
                type: finalType,
                utilisateur_id: user.id,
                preuves: uploadedUrls // Tableau d'URLs
            };

            // 3. Envoi au backend
            const res = await api.post("/signalements", payload);

            // Mise à jour du profil de l'utilisateur
            const userData = {
                name: fullName,
                ville: city,
                email: email,
                phone: phone
            };

            const userRes = await api.put(`/users/${user.id}`, userData);
            setUser(userRes.data);
            localStorage.setItem("user", JSON.stringify(userRes.data));

            console.log("Enregistré avec succès !");
            setIsSubmitting(false);
            setIsSuccess(true);
        } catch (error) {
            console.error("Erreur lors de la soumission:", error);
            if (error.response && error.response.status === 422) {
                console.log("Erreurs de validation:", error.response.data.errors);
                const errorMessages = Object.values(error.response.data.errors).flat().join('\n');
                alert(`Erreur de validation:\n${errorMessages}`);
            } else {
                alert("Une erreur est survenue lors de l'envoi du signalement.");
            }
            setIsSubmitting(false);
        }
    };

    const Step0 = (
        <Box sx={{ display: "flex", flexDirection: "column", height: "50%", width: "100%", maxWidth: 500 }}>
            <Typography sx={{ marginBottom: 1, fontSize: { xs: "0.8rem", md: "1rem" } }}>Type d'arnaques *</Typography>
            <Select
                placeholder="selectionner"
                indicator={<KeyboardArrowDown />}
                value={type}
                onChange={(e, newValue) => setType(newValue)}
                sx={{
                    [`& .${selectClasses.indicator}`]: {
                        transition: '0.2s',
                        [`&.${selectClasses.expanded}`]: { transform: 'rotate(-180deg)' },
                    },
                    fontSize: { xs: "0.8rem", md: "1rem" }
                }}
            >
                {existingTypes.map((t, idx) => (
                    <Option key={idx} sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }} value={t}>{t}</Option>
                ))}
                <Option sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }} value="Autre">Autre (Préciser...)</Option>
            </Select>

            {type === "Autre" && (
                <Input
                    placeholder="Précisez le type d'arnaque"
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value)}
                    sx={{
                        marginTop: 2,
                        fontSize: { xs: "0.8rem", md: "1rem" },
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        "&:focus-within": {
                            boxShadow: "0 4px 12px rgba(31, 158, 249, 0.2)"
                        }
                    }}
                />
            )}

            <Typography sx={{ marginBottom: 1, marginTop: 3, fontSize: { xs: "0.8rem", md: "1rem" } }}>Nom / Entreprise *</Typography>
            <Input sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }} placeholder="Nom de la personne ou de l'entreprise" value={scammerName} onChange={(e) => setScammerName(e.target.value)} />

            <Typography sx={{ marginBottom: 1, marginTop: 3, fontSize: { xs: "0.8rem", md: "1rem" } }}>Contact de l'Arnaqueur</Typography>
            <Input sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }} placeholder="Nom sur facebook, ou numero de telephone... etc" value={contact} onChange={(e) => setContact(e.target.value)} />

            <Typography sx={{ marginBottom: 1, marginTop: 3, fontSize: { xs: "0.8rem", md: "1rem" } }}>Description et detaille de l'arnaque *</Typography>
            <Textarea sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }} placeholder="Raconter nous en quelques ligne ce qu'on vous a fait..." minRows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
        </Box>
    );

    const Step1 = (
        <Box sx={{ display: "flex", flexDirection: "column", height: "50%", width: "100%", maxWidth: 500 }}>
            <Typography sx={{ fontSize: { xs: "1rem", md: "1.2rem" }, fontWeight: 600 }}>Preuves et pièces justificatives</Typography>
            <Typography sx={{ fontSize: { md: "0.8rem", xs: "0.6rem" }, color: "#565d6d" }}>Ajoutez tout document, image ou lien qui pourrait appuyer votre signalement.</Typography>
            <Typography sx={{ fontSize: { md: "1rem", xs: "0.8rem" }, color: "#565d6d", marginTop: 2 }}>Telecharger les preuves *</Typography>

            <Box sx={{ marginTop: 1, marginBottom: 2, }}>
                <FilePicker onFilesSelected={handleAddProofs} />
            </Box>

            <Box>
                {proofs.map((file, index) => (
                    <Box key={index} sx={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        backgroundColor: "#f3f3f3",
                        fontSize: { md: "0.9rem", xs: "0.6rem" }
                    }}>
                        {file.name}
                    </Box>
                ))}
            </Box>
        </Box>
    );

    const Step2 = (
        <Box sx={{ display: "flex", flexDirection: "column", height: "50%", width: "100%", maxWidth: 500 }}>
            <Typography sx={{ fontSize: { md: "1.2rem", xs: "1rem" }, fontWeight: 600 }}>Vos coordonnées (Confidentiel)</Typography>

            <Typography sx={{ marginTop: 2, fontSize: { md: "1rem", xs: "0.8rem" } }}>Votre nom Complet *</Typography>
            <Input placeholder="Nom complet"
                sx={{ mt: 1, fontSize: { md: "1rem", xs: "0.8rem" } }}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)} />

            <Typography sx={{ marginTop: 1, fontSize: { md: "1rem", xs: "0.8rem" } }}>Dans quelle ville etes vous? *</Typography>
            <Input placeholder="Ville"
                sx={{ mt: 1, fontSize: { md: "1rem", xs: "0.8rem" } }}
                value={city}
                onChange={(e) => setCity(e.target.value)} />

            <Typography sx={{ marginTop: 1, fontSize: { md: "1rem", xs: "0.8rem" } }}>Votre adresse email</Typography>
            <Input placeholder="Email"
                sx={{ mt: 1, fontSize: { md: "1rem", xs: "0.8rem" } }}
                value={email}
                onChange={(e) => setEmail(e.target.value)} />

            <Typography sx={{ marginTop: 1, fontSize: { md: "1rem", xs: "0.8rem" } }}>Numero de Telephone</Typography>
            <Input placeholder="Téléphone" sx={{ mt: 1, fontSize: { md: "1rem", xs: "0.8rem" } }}
                value={phone}
                onChange={(e) => setPhone(e.target.value)} />

            <Checkbox label="J'accepte les Conditions Generales et la politiques de confidentialité" sx={{ marginTop: 3, fontSize: { md: "1rem", xs: "0.6rem" } }} />
        </Box>
    );

    const contents = [Step0, Step1, Step2];

    return (
        <Box>
            <TopNav />

            <Box sx={{
                pt: { xs: "80px", md: "8rem" },
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingX: { md: 15, xs: 2 },
                py: 2
            }}>
                {isSubmitting || isSuccess ? (
                    <SubmissionStatus isSuccess={isSuccess} />
                ) : (
                    <>
                        <Stepper sx={{ width: '100%', marginBottom: 6 }}>
                            {steps.map((label, index) => (
                                <Step
                                    key={label}
                                    indicator={
                                        <StepIndicator
                                            variant={activeStep <= index ? "soft" : "solid"}
                                            color={activeStep < index ? "neutral" : "primary"}
                                        >
                                            {activeStep <= index ? index + 1 : <Check />}
                                        </StepIndicator>
                                    }
                                    sx={[
                                        activeStep > index && index !== 2 && { '&::after': { bgcolor: 'primary.solidBg' } },
                                    ]}
                                >
                                    <StepButton
                                        onClick={() => setActiveStep(index)}
                                        sx={{ display: { xs: "none", md: "block" } }}>{label}</StepButton>
                                </Step>
                            ))}
                        </Stepper>

                        <Typography sx={{ fontSize: { md: "1.8rem", xs: "1.2rem" }, fontWeight: 600, fontFamily: "Lato", marginBottom: 5 }}>
                            Signaler une Arnaque
                        </Typography>

                        {contents[activeStep]}

                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            maxWidth: 500,
                            marginTop: 6
                        }}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={() => setActiveStep(prev => prev - 1)}
                                style={{
                                    padding: "10px 20px",
                                    borderRadius: "6px",
                                    border: "1px solid #ccc",
                                    background: activeStep === 0 ? "#eee" : "white",
                                    color: activeStep > 0 ? "2e7d32" : "gray",
                                    cursor: activeStep === 0 ? "not-allowed" : "pointer",
                                }}
                                sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                            >
                                Precedent
                            </Button>

                            {activeStep < 2 ? (
                                <Button
                                    onClick={() => setActiveStep(prev => prev + 1)}
                                    style={{
                                        padding: "10px 20px",
                                        borderRadius: "6px",
                                        background: "#1976d2",
                                        color: "white",
                                        border: "none",
                                        cursor: "pointer",
                                        fontSize: { xs: "0.8rem", md: "1rem" }
                                    }}
                                    sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                                >
                                    Suivant
                                </Button>
                            ) : (
                                <Button onClick={handleSUbmit}
                                    style={{
                                        padding: "10px 20px",
                                        borderRadius: "6px",
                                        background: "2e7d32",
                                        color: "white",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    Envoyer
                                </Button>
                            )}
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
}

export default FormSignal;

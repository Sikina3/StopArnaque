import { Box, selectClasses, Typography } from "@mui/material";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import React, { useState } from "react";
import { Button, Checkbox, Input, Option, Select, Step, StepButton, StepIndicator, Stepper, Textarea } from "@mui/joy";
import { Check, FileOpen, KeyboardArrowDown } from "@mui/icons-material";
import FilePicker from "../components/FilePicker";

const steps = ['type et details', 'Preuves et pieces justificatives', 'Vos coordonnées (Confidentiel)'];

function FormSignal() {
    const [activeStep, setActiveStep] = useState(0);
    const [proofs, setProofs] = useState([]);

    const handleAddProofs = (files) => {
        if (proofs.length + files.length > 6) return;

        setProofs(prev => [...prev, ...files].slice(0, 6));
    };

    const Step0 = (
        <Box sx={{ display: "flex", flexDirection: "column", height: "50%" }}>
            <Typography sx={{ marginBottom: 1 }}>Type d'arnaques *</Typography>
            <Select
                placeholder="selectionner"
                indicator={<KeyboardArrowDown />}
                sx={{
                    width: 500,
                    [`& .${selectClasses.indicator}`]: {
                        transition: '0.2s',
                        [`&.${selectClasses.expanded}`]: { transform: 'rotate(-180deg)' },
                    },
                }}
            >
                <Option value="Phishing">Phishing</Option>
                <Option value="Hack de compte">Hack de compte</Option>
                <Option value="Faux vendeurs / Faux acheteurs">Faux vendeurs / Faux acheteurs</Option>
                <Option value="Colis bloqué">Colis bloqué</Option>
            </Select>

            <Typography sx={{ marginBottom: 1, marginTop: 3 }}>Nom / Entreprise *</Typography>
            <Input placeholder="Nom de la personne ou de l'entreprise" />

            <Typography sx={{ marginBottom: 1, marginTop: 3 }}>Description et detaille de l'arnaque *</Typography>
            <Textarea placeholder="Raconter nous en quelques ligne ce qu'on vous a fait..." minRows={4} />
        </Box>
    );

    const Step1 = (
        <Box sx={{ display: "flex", flexDirection: "column", height: "50%" }}>
            <Typography sx={{ fontSize: "1.2rem", fontWeight: 600}}>Preuves et pièces justificatives</Typography>
            <Typography sx={{ fontSize: "0.8rem", color: "#565d6d" }}>Ajoutez tout document, image ou lien qui pourrait appuyer votre signalement.</Typography>
            <Typography sx={{ fontSize: "1rem", color: "#565d6d", marginTop: 2 }}>Telecharger les preuves *</Typography>
            
            <Box sx={{ marginTop: 1, marginBottom: 2}}>
                <FilePicker onFilesSelected={handleAddProofs}/>
            </Box>

            <Box>
                {proofs.map((file, index) => (
                    <Box key={index} sx={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        backgroundColor: "#f3f3f3",
                        fontSize: "0.9rem"
                    }}>
                        {file.name}
                    </Box>
                ))}
            </Box>
        </Box>
    );

    const Step2 = (
        <Box sx={{ display: "flex", flexDirection: "column", height: "50%" }}>
            <Typography sx={{ fontSize: "1.2rem", fontWeight: 600}}>Vos coordonnées (Confidentiel)</Typography>
            
            <Typography sx={{ marginTop: 2}}>Votre nom Complet *</Typography>
            <Input placeholder="Nom complet" sx={{ mt: 2, width: 500 }} />
            <Typography sx={{ marginTop: 1}}>Dans quelle ville etes vous? *</Typography>
            <Input placeholder="Ville" sx={{ mt: 2, width: 500 }} />
            <Typography sx={{ marginTop: 1}}>Votre adresse email</Typography>
            <Input placeholder="Email" sx={{ mt: 2, width: 500 }} />
            <Typography sx={{ marginTop: 1}}>Numero de Telephone</Typography>
            <Input placeholder="Téléphone" sx={{ mt: 2 }} />

            <Checkbox label="J'accepte les Conditions Generales et la politiques de confidentialité" sx={{ marginTop: 1}}/>
        </Box>
    );

    const contents = [Step0, Step1, Step2];

    return (
        <Box>
            <TopNav />

            <Box sx={{
                marginTop: 14,
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
                alignItems: "center",
                paddingX: 20
            }}>
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
                            <StepButton onClick={() => setActiveStep(index)}>{label}</StepButton>
                        </Step>
                    ))}
                </Stepper>
                
                <Typography sx={{ fontSize: "1.8rem", fontWeight: 600, fontFamily: "Lato", marginBottom: 5 }}>
                    Signaler une Arnaque
                </Typography>

                {contents[activeStep]}

                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: 500,
                    marginTop: 6
                }}>
                    <Button 
                        disabled= {activeStep === 0}
                        onClick={() => setActiveStep(prev => prev -1)}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            background: activeStep === 0 ? "#eee" : "white",
                            color: activeStep > 0 ? "2e7d32" : "gray",
                            cursor: activeStep === 0 ? "not-allowed" : "pointer"
                        }}
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
                                cursor: "pointer"
                            }}
                        >
                            Suivant
                        </Button>
                    ) : (
                        <Button onClick={() => alert("Formulaire bien soumis!")}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "6px",
                            background: "2e7d32",
                            color: "white",
                            border: "none",
                            cursor: "pointer"
                        }}>
                            Envoyer
                        </Button>
                    )}
                </Box>
            </Box>

            <Footer />
        </Box>
    );
}

export default FormSignal;

import { Box, Button, Typography } from "@mui/material";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import gsap from "gsap";
import "../../styles/index.css";
import Signin from "./Signin";
import Signup from "./Signup";

function Login() {
  const container = useRef();
  const [modeLogin, setModeLogin] = useState("false");

  useGSAP(
    () => {
      gsap.from(".good", { rotation: 0 });
    },
    { scope: container }
  );

  const goRight = () => {
    const tl = gsap.timeline();

    if (window.innerWidth < 900) {
      tl.to(".panel", {
        y: "150%",
        duration: 0.8,
        ease: "power3.inOut",
      }).call(() => setModeLogin(false), null, "-=0.5");
    } else {
      tl.to(".panel", {
        x: "100%",
        duration: 0.8,
        ease: "power3.inOut",
      }).call(() => setModeLogin(false), null, "-=0.4");
    }
  };

  const goLeft = () => {
    const tl = gsap.timeline();
    if (window.innerWidth < 900) {
      tl.to(".panel", {
        y: "0%",
        duration: 0.8,
        ease: "power3.inOut",
      }).call(() => setModeLogin(true), null, "-=0.5");;
    } else {
      tl.to(".panel", {
        x: "0%",
        duration: 0.8,
        ease: "power3.inOut",
      }).call(() => setModeLogin(true), null, "-=0.4");
    }

  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
      }}
    >
      <Box
        ref={container}
        sx={{
          width: { md: "60%", xs: "85%" },
          height: { md: "65%", xs: "90%" },
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          borderRadius: 4,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          backgroundColor: "#fff"
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #1F9EF9 0%, #0056b3 100%)",
            borderRadius: "25%",
            position: "absolute",
            display: "flex",
            left: { md: "-50%", xs: "0" },
            top: { md: "0", xs: "-75%" },
            zIndex: 10,
            flexDirection: { md: "row", xs: "column" },
            boxShadow: "0 10px 40px rgba(31, 158, 249, 0.3)",
            // Decorative overlay pattern
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              pointerEvents: "none"
            }
          }}
          className="panel"
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: { md: "center", },
              alignItems: "center",
              paddingTop: { md: 0, xs: 2 }
            }}
          >
            <Typography color="white" sx={{ fontSize: { md: "1.6rem", xs: "1.3rem" }, fontFamily: "Lato", fontWeight: 700, marginBottom: { md: 3, xs: 2 } }}>Bonjour !</Typography>
            <Typography color="white" sx={{ fontSize: { md: "0.9rem", xs: "0.75rem" }, fontFamily: "Lato", marginBottom: { md: 3, xs: 2 }, opacity: 0.95, textAlign: "center", px: 2 }}>Vous avez déjà un compte ?</Typography>
            <Button
              onClick={goLeft}
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "white",
                fontSize: { md: "1rem", xs: "0.8rem" },
                borderWidth: 2,
                px: 4,
                py: 1,
                borderRadius: 3,
                fontWeight: 600,
                "&:hover": {
                  borderWidth: 2,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "white"
                }
              }}
            >
              Se connecter
            </Button>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: { md: "center", xs: "end" },
              alignItems: "center",
              paddingBottom: { md: 0, xs: 2 }
            }}
          >
            <Typography color="white" sx={{ fontSize: { md: "1.6rem", xs: "1.3rem" }, fontFamily: "Lato", fontWeight: 700, marginBottom: { md: 3, xs: 1 } }}>Ravis de vous revoir !</Typography>
            <Typography color="white" sx={{ fontSize: { md: "0.9rem", xs: "0.75rem" }, fontFamily: "Lato", marginBottom: { md: 3, xs: 2 }, opacity: 0.95, textAlign: "center", px: 2 }}>Pas encore de compte ?</Typography>
            <Button
              onClick={goRight}
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "white",
                fontSize: { md: "1rem", xs: "0.8rem" },
                borderWidth: 2,
                px: 4,
                py: 1,
                borderRadius: 3,
                fontWeight: 600,
                "&:hover": {
                  borderWidth: 2,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "white"
                }
              }}
            >
              Créer un compte
            </Button>
          </Box>
        </Box>

        <Box sx={{ width: { md: "50%", xs: "100%", }, height: { md: "100%" }, paddingTop: { md: 0, xs: 2 } }}>
          {!modeLogin ? <Signup /> : null}
        </Box>

        <Box sx={{ width: { md: "50%", xs: "100%" }, height: { md: "100%" }, paddingBottom: { md: 0, xs: 3 }, paddingTop: { md: 0, xs: 24 } }}>
          {modeLogin ? <Signin /> : null}
        </Box>
      </Box>
    </Box>
  );
}

export default Login;

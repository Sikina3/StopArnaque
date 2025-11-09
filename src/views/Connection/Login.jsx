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

    if(window.innerWidth < 900) {
        tl.to(".panel", {
            y: "140%",
            duration: 0.4,
            ease: "power3.inOut",
            onComplete: () => setModeLogin(false),
          });
    } else {
        tl.to(".panel", {
            x: "100%",
            duration: 0.4,
            ease: "power3.inOut",
            onComplete: () => setModeLogin(false)
          });
    }
    // tl.set(".panel", {
    //   x: "100%",
    // });
  };

  const goLeft = () => {
    const tl = gsap.timeline();
    if (window.innerWidth < 900){
        tl.to(".panel", {
            y: "0%",
            duration: 0.4,
            ease: "power3.inOut",
            onComplete: () => setModeLogin(true),
          });
    } else {
        tl.to(".panel", {
            x: "0%",
            duration: 0.4,
            ease: "power3.inOut",
            onComplete: () => setModeLogin(true),
          });
    }

    // tl.set(".panel", {
    //   x: 0,
    // });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        ref={container}
        sx={{
          width: { md: "60%", xs: "80%" },
          height: { md: "65%", xs: "90%" },
          boxShadow: 2,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: {xs: "column", md: "row"}
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#4c8df6",
            borderRadius: "25%",
            position: "absolute",
            display: "flex",
            left: { md: "-50%", xs: "0" },
            top: { md: "0", xs: "-70%" },
            zIndex: 10,
            flexDirection: {md: "row", xs: "column"},
          }}
          className="panel"
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button onClick={goLeft} variant="outlined" sx={{ borderColor: "white", color: "white"}}>Aller a Gauche</Button>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button onClick={goRight} variant="outlined" sx={{ borderColor: "white", color: "white"}}>Crée un compte</Button>
          </Box>
        </Box>

        <Box sx={{ width: { md: "50%", xs: "100%",}, height: {md: "100%"}, paddingTop: {md: 0, xs: 2} }}>
          {!modeLogin ? <Signup /> : null}
        </Box>

        <Box sx={{ width: { md: "50%", xs: "100%"}, height: {md: "100%"}, paddingBottom: {md: 0, xs: 3}, paddingTop: {md: 0, xs: 24}}}>
          {modeLogin ? <Signin /> : null}
        </Box>
      </Box>
    </Box>
  );
}

export default Login;

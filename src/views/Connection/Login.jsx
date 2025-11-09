import { Box, Button, Typography } from "@mui/material";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import "../../styles/index.css"
import Signin from "./Signin";
import Signup from "./Signup";

function Login() {
    const container = useRef();

    useGSAP(() => {
        gsap.from('.good', { rotation: 0 });
    }, { scope: container });

    const goRight = () => {
        const tl = gsap.timeline();

        tl.to(".panel", {
            x: "100%",
            duration: 1.5,
            ease: "power3.inOut",
        });

        tl.set(".panel", {
            x: "100%",
        });
    };

    const goLeft = () => {
        const tl = gsap.timeline();

        tl.to(".panel", {
            x: "0%",
            duration: 1.5,
            ease: "power3.inOut",
        });

        tl.set(".panel", {
            x: 0
        })
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
        <Box ref={container} sx={{ width: "60%", height: "65%", boxShadow: 2, position: "relative", overflow: "hidden", display: "flex"}}>
            <Box sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "#4c8df6",
                borderRadius: "25%",
                position: "absolute",
                display: "flex",
                left: "-50%",
                zIndex: 10
            }} className="panel">
                <Box sx={{ flex: 1,  display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Button onClick={goLeft} >Aller a Gauche</Button>
                </Box>
                
                <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Button onClick={goRight}>Aller a droite</Button>
                </Box>
            </Box>

            <Box sx={{ width: "50%", height: "100%"}}>
                <Signup />
            </Box>

            <Box sx={{ width: "50%", height: "100%"}}>
                <Signin />
            </Box>
        </Box>
    </Box>
  );
}

export default Login;

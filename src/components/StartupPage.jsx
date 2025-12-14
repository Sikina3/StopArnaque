import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import gsap from "gsap";

const StartupPage = ({ onComplete }) => {
    const containerRef = useRef(null);
    const logoRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Optional: Fade out the whole container before unmounting
                gsap.to(containerRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: onComplete
                });
            }
        });

        // Initial set
        gsap.set([logoRef.current, textRef.current], { opacity: 0, y: 20 });

        // Animation sequence
        tl.to(logoRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        })
            .to(logoRef.current, {
                scale: 1.2,
                duration: 1.5,
                yoyo: true,
                repeat: 1,
                ease: "sine.inOut"
            }, "-=0.5")
            .to(textRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=1.5")
            .to({}, { duration: 1.5 }); // Wait a bit at the end (total approx 4-5s)

        return () => {
            tl.kill();
        };
    }, [onComplete]);

    return (
        <Box
            ref={containerRef}
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
            }}
        >
            <GppGoodOutlinedIcon
                ref={logoRef}
                sx={{
                    fontSize: 100,
                    color: "#1F9EF9",
                    mb: 2
                }}
            />
            <Typography
                ref={textRef}
                variant="h3"
                sx={{
                    fontFamily: "Lato",
                    color: "#1F9EF9",
                    fontWeight: "bold",
                    letterSpacing: 2
                }}
            >
                Signaleo
            </Typography>
        </Box>
    );
};

export default StartupPage;

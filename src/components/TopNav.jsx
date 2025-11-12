import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import "../styles/Welcom.css";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

const pages = ["Accueil", "contacts", "signaler"];

function TopNav() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <AppBar elevation={1} sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
            <Logo />
          </Box>

          {/** Box pour la responsive android */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon sx={{ color: "#1F9EF9" }} />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                //emplacement du menu navigation
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  backgroundColor: "rgba(255,255,255,0.95)", // fond légèrement transparent
                  backdropFilter: "blur(6px)",
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center", fontFamily: "Lato" }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Espace gauche */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
            }}
          >
            <Logo />
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton aria-label="Login" onClick={goToLogin}>
              <LoginIcon sx={{ color: "#1F9EF9" }} />
            </IconButton>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
            justifyContent="center"
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Button
            sx={{
              display: { xs: "none", md: "flex", backgroundColor: "#1F9EF9" },
            }}
            variant="contained"
            startIcon={<LoginIcon />}
            onClick={goToLogin}
          >
            {" "}
            Connexion{" "}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopNav;

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
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Dropdown, MenuButton, Menu as JoyMenu, MenuItem as JoyMenuItem, Badge } from "@mui/joy";
import NotificationMenu from "./NotificationMenu";

const pages = ["Accueil", "signaler"];

function TopNav() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const routes = {
    Accueil: "/",
    signaler: "/signaler"
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
                <MenuItem
                  key={page}
                  onClick={() => navigate(routes[page])}
                  selected={location.pathname === routes[page]}
                >
                  <Typography sx={{
                    textAlign: "center",
                    fontFamily: "Lato",
                    color: location.pathname === routes[page] ? "#1F9EF9" : "inherit",
                    fontWeight: location.pathname === routes[page] ? "bold" : "normal"
                  }}>
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
                onClick={() => navigate(routes[page])}
                sx={{
                  my: 2,
                  color: location.pathname === routes[page] ? "#1F9EF9" : "black",
                  display: "block",
                  fontWeight: location.pathname === routes[page] ? "bold" : "normal",
                  borderBottom: location.pathname === routes[page] ? "2px solid #1F9EF9" : "none",
                  borderRadius: 0
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {user ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Notification Icon */}
              <NotificationMenu />

              {/* User Menu */}
              <Dropdown>
                <MenuButton
                  variant="plain"
                  sx={{
                    p: 0,
                    minWidth: 0,
                    borderRadius: "50%",
                    "&:hover": { backgroundColor: "rgba(31, 158, 249, 0.1)" }
                  }}
                >
                  <AccountCircleIcon sx={{ color: "#1F9EF9", fontSize: "2rem", display: "flex"}}>
                    {user.pseudo ? user.pseudo[0].toUpperCase() : "U"}
                  </AccountCircleIcon>
                </MenuButton>

                <JoyMenu
                  sx={{
                    minWidth: 200,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    borderRadius: 3,
                    p: 4,
                  }}
                >
                  <JoyMenuItem
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      fontFamily: "Lato",
                      fontWeight: 600,
                      pointerEvents: "none",
                      backgroundColor: "rgba(31, 158, 249, 0.1)",
                      color: "#1F9EF9"
                    }}
                  >
                    <PersonIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                    {user.pseudo || "Utilisateur"}
                  </JoyMenuItem>
                  <JoyMenuItem
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      fontFamily: "Lato",
                      "&:hover": { backgroundColor: "rgba(31, 158, 249, 0.1)" }
                    }}
                  >
                    <SettingsIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                    Mon compte
                  </JoyMenuItem>
                  <JoyMenuItem
                    onClick={logout}
                    sx={{
                      borderRadius: 2,
                      fontFamily: "Lato",
                      color: "#e74c3c",
                      "&:hover": { backgroundColor: "rgba(231, 76, 60, 0.1)" }
                    }}
                  >
                    <LogoutIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                    Déconnexion
                  </JoyMenuItem>
                </JoyMenu>
              </Dropdown>
            </Box>
          ) : (
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
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopNav;

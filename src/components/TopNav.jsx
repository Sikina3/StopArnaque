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
import "../styles/Welcom.css";
import Logo from "./Logo";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Dropdown, MenuButton, Menu as JoyMenu, MenuItem as JoyMenuItem } from "@mui/joy";
import NotificationMenu from "./NotificationMenu";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

const pages = [
  { label: <HomeRoundedIcon sx={{ fontSize: { md: "1.8rem" } }} />, route: "/" },
  { label: <AddCircleRoundedIcon sx={{ fontSize: { md: "1.8rem" } }} />, route: "/signaler" },
  { label: <AssignmentRoundedIcon sx={{ fontSize: { md: "1.8rem" } }} />, route: "/signalements" }
];

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

  return (
    <Box sx={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      px: { xs: 0, md: 4 },
      py: { xs: 0, md: 2 },
      zIndex: 1100,
      backgroundColor: "rgb(255, 255, 255, 0.3)",
      backdropFilter: "blur(10px)",
      webkitBackdropFilter: "blur(10px)",
    }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "white",
          borderRadius: { md: 10 },
          boxShadow: { md: "0 2px 12px rgba(0, 0, 0, 0.08)" },
          py: { xs: 0.5 }
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: "56px", md: "70px" },
              py: { xs: 0.5, md: 1 }
            }}
          >
            {/* Logo - Left Side */}
            <Box sx={{ display: { xs: "flex", md: "flex" }, mr: { xs: 1, md: 4 } }}>
              <Logo />
            </Box>

            {/* Desktop Navigation - Center */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "flex" },
                justifyContent: "center",
                gap: { xs: 0.5, md: 1 }
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.route}
                  onClick={() => navigate(page.route)}
                  sx={{
                    px: { xs: 1.5, md: 2 },
                    py: 1,
                    minWidth: { xs: 0, md: 64 },
                    color: location.pathname === page.route ? "#1F9EF9" : "#acababff",
                    fontFamily: "Lato",
                    fontSize: "15px",
                    fontWeight: location.pathname === page.route ? 600 : 400,
                    textTransform: "none",
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "rgba(31, 158, 249, 0.08)",
                      color: "#1F9EF9"
                    }
                  }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>

            {/* Right Side - Auth/User Section */}
            {user ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
                      "&:hover": { backgroundColor: "rgba(31, 158, 249, 0.08)" }
                    }}
                  >
                    <AccountCircleIcon sx={{
                      color: "#acababff",
                      fontSize: { md: "2rem", xs: "1.8rem" }
                    }} />
                  </MenuButton>

                  <JoyMenu
                    placement="bottom-end"
                    sx={{
                      minWidth: 200,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      borderRadius: 2,
                      p: 1,
                      zIndex: 2000
                    }}
                  >
                    <JoyMenuItem
                      sx={{
                        borderRadius: 1.5,
                        mb: 0.5,
                        fontFamily: "Lato",
                        fontWeight: 600,
                        pointerEvents: "none",
                        backgroundColor: "rgba(31, 158, 249, 0.08)",
                        color: "#1F9EF9"
                      }}
                    >
                      <PersonIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                      {user.pseudo || "Utilisateur"}
                    </JoyMenuItem>
                    <JoyMenuItem
                      sx={{
                        borderRadius: 1.5,
                        mb: 0.5,
                        fontFamily: "Lato",
                        "&:hover": { backgroundColor: "rgba(31, 158, 249, 0.08)" }
                      }}
                    >
                      <SettingsIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                      Mon compte
                    </JoyMenuItem>
                    <JoyMenuItem
                      onClick={logout}
                      sx={{
                        borderRadius: 1.5,
                        fontFamily: "Lato",
                        color: "#e74c3c",
                        "&:hover": { backgroundColor: "rgba(231, 76, 60, 0.08)" }
                      }}
                    >
                      <LogoutIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                      Déconnexion
                    </JoyMenuItem>
                  </JoyMenu>
                </Dropdown>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {/* Mobile Login Icon */}
                <IconButton
                  onClick={goToLogin}
                  sx={{
                    display: { xs: "inline-flex", md: "none" },
                    color: "#1F9EF9",
                    "&:hover": { backgroundColor: "rgba(31, 158, 249, 0.08)" }
                  }}
                >
                  <LoginRoundedIcon sx={{ fontSize: "1.5rem" }} />
                </IconButton>

                {/* Desktop Buttons */}
                <Button
                  onClick={goToLogin}
                  sx={{
                    display: { xs: "none", md: "inline-flex" },
                    px: 2.5,
                    py: 1,
                    color: "#333",
                    fontFamily: "Lato",
                    fontSize: "15px",
                    fontWeight: 500,
                    textTransform: "none",
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)"
                    }
                  }}
                >
                  Connexion
                </Button>
                <Button
                  onClick={() => navigate("/login")}
                  variant="contained"
                  sx={{
                    display: { xs: "none", md: "inline-flex" },
                    px: 3,
                    py: 1,
                    backgroundColor: "#1F9EF9",
                    color: "white",
                    fontFamily: "Lato",
                    fontSize: "15px",
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: 2,
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#1A8ED9",
                      boxShadow: "none"
                    }
                  }}
                >
                  Créer un compte
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default TopNav;

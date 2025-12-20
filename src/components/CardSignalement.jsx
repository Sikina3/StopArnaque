import { Box, Button, Grid, Paper, Typography, IconButton } from "@mui/material";
import Divider from '@mui/material/Divider';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function CardSignalement({ id, titre, categorie, date, LikeNumber, ChatNumber, image, isLiked }) {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(parseInt(LikeNumber) || 0);
  const [liked, setLiked] = useState(isLiked || false);
  const { user } = useAuth();

  const handleLike = async (e) => {
    e.preventDefault(); // Prevent navigation if inside a link

    // Optimistic update
    const newLiked = !liked;
    setLiked(newLiked);
    setLikes(prev => newLiked ? prev + 1 : prev - 1);

    try {
      await api.post('/reactions/toggle', {
        signalement_id: id,
        utilisateur_id: user.id
      });
    } catch (error) {
      console.error("Erreur like:", error);
      // Revert
      setLiked(!newLiked);
      setLikes(prev => newLiked ? prev - 1 : prev + 1);
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', width: "20rem" }}>
      <Paper
        // elevation={0}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          padding: 2.5,
          border: "1px solid #f0f0f0",
          backgroundColor: "#fff",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
            borderColor: "#1F9EF9"
          }
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "180px",
            borderRadius: 2,
            overflow: "hidden",
            mb: 2,
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 100%)",
              pointerEvents: "none"
            }
          }}
        >
          <img
            src={image}
            alt={titre}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          />
        </Box>

        <Typography
          sx={{
            fontSize: { md: "1.05rem", xs: "0.9rem" },
            marginBottom: 1.5,
            color: "#1A1A1A",
            fontFamily: "Lato",
            fontWeight: 600,
            lineHeight: 1.4,
            minHeight: "48px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
        >
          {titre}
        </Typography>

        <Box
          sx={{
            display: "inline-flex",
            backgroundColor: "rgba(31, 158, 249, 0.1)",
            borderRadius: 10,
            padding: "6px 16px",
            marginBottom: 1.5,
            alignSelf: "flex-start"
          }}
        >
          <Typography
            sx={{
              fontSize: { md: "0.75rem", xs: "0.65rem" },
              color: "#1F9EF9",
              fontWeight: 600,
              fontFamily: "Lato",
            }}
          >
            {categorie}
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: { md: "0.8rem", xs: "0.7rem" },
            color: "#999",
            marginBottom: 2,
            fontFamily: "Lato"
          }}
        >
          Il y a {date}
        </Typography>

        <Divider sx={{ marginBottom: 2 }} />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: 'pointer' }} onClick={handleLike}>
              {liked ? (
                <FavoriteIcon
                  sx={{
                    color: "#e74c3c",
                    fontSize: { xs: 18, md: 22 },
                    transition: "transform 0.2s",
                    "&:active": { transform: "scale(1.2)" }
                  }}
                />
              ) : (
                <FavoriteBorderOutlinedIcon
                  sx={{
                    color: "#999",
                    fontSize: { xs: 18, md: 22 },
                    transition: "color 0.2s",
                    "&:hover": { color: "#e74c3c" }
                  }}
                />
              )}
              <Typography sx={{ color: liked ? "#e74c3c" : "#999", fontSize: { xs: "0.75rem", md: "0.85rem" }, fontWeight: liked ? 600 : 400 }}>
                {likes}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <ChatBubbleOutlineOutlinedIcon
                sx={{
                  color: "#999",
                  fontSize: { xs: 18, md: 22 },
                  transition: "color 0.2s",
                  "&:hover": { color: "#1F9EF9" }
                }}
              />
              <Typography sx={{ color: "#999", fontSize: { xs: "0.75rem", md: "0.85rem" } }}>
                {ChatNumber}
              </Typography>
            </Box>
          </Box>

          <Button
            onClick={() => navigate(`/signalements/${id}`)}
            sx={{
              color: "#1F9EF9",
              fontSize: { md: "0.8rem", xs: "0.7rem" },
              textTransform: "none",
              fontWeight: 600,
              padding: "4px 12px",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "rgba(31, 158, 249, 0.08)"
              }
            }}
          >
            Voir détails
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}

export default CardSignalement;

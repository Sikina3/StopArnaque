import axios from "axios";

const api = axios.create({
  // Utilisez http://127.0.0.1:8000/api pour le développement local
  // Utilisez l'URL ngrok ou de production si nécessaire
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

export default api;

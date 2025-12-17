import axios from "axios";

const api = axios.create({
  baseURL: "https://signaleo-backend-1.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

export default api;

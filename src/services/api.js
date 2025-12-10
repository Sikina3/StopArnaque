import axios from "axios";

const api = axios.create({
  baseURL: "https://verlie-nonprosperous-pearl.ngrok-free.dev/api",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

export default api;

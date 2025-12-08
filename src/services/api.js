import axios from "axios";

const api = axios.create({
  baseURL: "https://verlie-nonprosperous-pearl.ngrok-free.dev/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

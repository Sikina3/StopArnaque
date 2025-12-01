import { useState, useEffect } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (data) {
      const parsed = JSON.parse(data);
      console.log("Les données: ", parsed.pseudo);
      setUser(parsed);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, setUser, logout };
}

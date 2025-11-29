import { useState, useEffect } from "react";

export default function useAuth(){
    const [user, setUser] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem("user");

        if(data) {
            setUser(JSON.parse(data));
        }
    }, []);

    return { user, setUser };
}
"use client";

import { createContext, useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    
    // Runs when app starts
    useEffect(() => {
        fetchUser();
    }, []);

    // Get current logged-in user
    async function fetchUser() {
        try {
            /* IF user not logged in! -> no token sent to backend httpcookie storage
            Se without httpcookie , even if the request Hit the "/profile"
            it will get error , and kicked to the catch(error) section 
            */
            const response = await api.get("/profile");
            setUser(response.data);
        } catch (error) {
            setUser(null);
            // Below code would send every user to /login just after they visit website,
            // even when they're trying to access public pages log in will be required.
            // But it doesnt protect public routes .
            // router.replace("/login")
        } finally {
            // console.log("Finally executed");
            setLoading(false);
        }
    }

    // console.log(user)
    // console.log(loading)

    // Called after successful login
    async function Log_in() {
        await fetchUser();
    }

    // Called while logging out
    async function Log_out() {
        try {
            await api.post("/log_out");
        } catch (error) {
            console.log(error);
        }

        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                Log_in,
                Log_out,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
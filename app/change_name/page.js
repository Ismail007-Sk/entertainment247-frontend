"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/custom_hook_auth";
import { changeName } from "@/service/signup_service";

export default function ChangeName() {
    const [name, setName] = useState("");

    const auth = useAuth();
    const router = useRouter();

    // Show loading while auth is being fetched
    if (!auth || auth.loading) {
        return <p>Loading...</p>;
    }

    // If user is not logged in
    if (!auth.user) {
        return <p>Please login first.</p>;
    }

    const id = auth.user?.user?.id;

    async function submitForm(e) {
        e.preventDefault();

        if (!name.trim()) {
            alert("Please enter a new name.");
            return;
        }

        try {
            const response = await changeName(id, { name });
            alert(response.message);
            router.replace("/");
        } catch (error) {
            alert(error.response?.data?.detail || "Not connected to backend");
        }
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <label>New Name:</label>
                <input
                    type="text"
                    placeholder="Enter new name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
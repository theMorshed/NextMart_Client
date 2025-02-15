"use server"
import { FieldValues } from "react-hook-form";

export const registerUser = async(userData: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',        
        },
        body: JSON.stringify(userData)
    });
    const result = await res.json();

    return result;
}
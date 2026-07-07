"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/auth_context";



// Its a custom hook, before creating any custom hook make sure function name strats with use
// example -> useAnyname() , here useAuth()
// Inside custom hook one or multiple react hook use recommended  otherwise its better  to use normal function
// Here, useContext() accesses the values provided by AuthContext.Provider., custom hook created
// so we can access AuthProvided value using useAuth() , other wise eveytime useContext will be required !!

export function useAuth(){
    return useContext(AuthContext)
}
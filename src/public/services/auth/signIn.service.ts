import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../private/services/firebase/firebase";

export const createUser = async (email: string, password: string) => {
    try { 
        const registeredUser = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Obtener el id y el token", registeredUser);
        
        return registeredUser;
    } catch (error) {
      console.log("Manejo errores globales", error)
    }
}
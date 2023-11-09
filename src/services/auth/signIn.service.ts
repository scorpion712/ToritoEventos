import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "..";
 

export const createUser = async (email: string, password: string) => {
    try { 
        const registeredUser = await createUserWithEmailAndPassword(auth, email, password);
        auth.currentUser && await sendEmailVerification(auth.currentUser);

        return registeredUser;
    } catch (error) {
      console.log("Manejo errores globales", error)
    }
}
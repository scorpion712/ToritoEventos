import { doc, setDoc } from "firebase/firestore";
import { AppointmentOwner } from "../../models/AppointmentModel";
import { db } from "../firebase/firebase";
 

export const registerUserForm = async (user: AppointmentOwner) => {
    try { 
        // Add a new document with a generated id.  
        const eventDocRef = doc(db, "users", user.id);  
        await setDoc(eventDocRef, user); 
        
        return true;
      } catch (error) {
      console.log("Manejo errores globales", error)
      return false;
    }
}
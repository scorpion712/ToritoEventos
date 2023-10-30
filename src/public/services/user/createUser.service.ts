import { addDoc, collection } from "firebase/firestore";

import { AppointmentOwner } from "../../models/AppointmentModel";
import { db } from "../../../private/services/firebase/firebase";

export const registerUserForm = async (user: AppointmentOwner) => {
    try { 
        const docRef = await addDoc(collection(db, "users"), user);
        return docRef ? true : false;
    } catch (error) {
      console.log("Manejo errores globales", error)
      return false;
    }
}
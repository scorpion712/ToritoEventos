import { doc, getDoc } from "firebase/firestore";
import { AppointmentOwner } from "../../models/AppointmentModel";
import { db } from "../../../private/services/firebase/Firebase";

export const adaptFirebaseUserToUserModel = (ownersIdArray: string []) => {
    let owners = [] as AppointmentOwner[];
    ownersIdArray.forEach(async (ownerId) => {
        const docRef = doc(db, "users", ownerId.trim());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists())
            owners.push({
                id: docSnap.data().id,
                name: docSnap.data().name,
                surname: docSnap.data().surname,
                phone: docSnap.data().phone,
                email: docSnap.data().email,
            } as AppointmentOwner);
    });
    
    return owners;
}
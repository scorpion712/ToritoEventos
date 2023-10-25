import { DocumentData, DocumentSnapshot } from "firebase/firestore";

import { AppointmentOwner } from "../../models/AppointmentModel";

export const adaptFirebaseUserToUserModel = (docSnap: DocumentSnapshot<DocumentData, DocumentData>) => {
    if (docSnap.exists())
        return {
            id: docSnap.data().id,
            name: docSnap.data().name,
            surname: docSnap.data().surname,
            phone: docSnap.data().phone,
            email: docSnap.data().email,
        } as AppointmentOwner;
    return {} as AppointmentOwner;
}
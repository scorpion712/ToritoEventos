import { DocumentData, DocumentSnapshot } from "firebase/firestore";

import { AppointmentOwner } from "../../models/AppointmentModel";
import { formatFirebaseTimestampToDate } from "../../utilities";

export const adaptFirebaseUserToUserModel = (docSnap: DocumentSnapshot<DocumentData, DocumentData>) => {
    if (docSnap.exists())
        return {
            id: docSnap.id,
            name: docSnap.data().name,
            surname: docSnap.data().surname,
            phone: docSnap.data().phone,
            email: docSnap.data().email,
            bornDate: docSnap.data().bornDate ? formatFirebaseTimestampToDate(docSnap.data().bornDate) : null
        } as AppointmentOwner;
    return {} as AppointmentOwner;
}
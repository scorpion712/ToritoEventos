import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { EventModel } from "../../models/EventModel";
import { formatFirebaseTimestampToDate } from "../../utilities";
import { AppointmentOwner } from "../../models/AppointmentModel";

export const adaptFirebaseEventToEventModel = (doc: DocumentSnapshot<DocumentData, DocumentData>) => {
    if (doc.exists()) {
        return {
           id: doc.id,
           title: doc.data().title,
           startDate: formatFirebaseTimestampToDate(doc.data().startDate),
           endDate: formatFirebaseTimestampToDate(doc.data().endDate),
           guests: doc.data().guests,
           eventType: doc.data().eventType,
           img: doc.data().img,
           ownersId: doc.data().owners,
           confirmed: doc.data().confirmed || false,
           notes: doc.data().notes,
           owners: [] as AppointmentOwner[]
       } as EventModel;
    }
    return {} as EventModel;
}
import { DocumentData, QuerySnapshot } from "firebase/firestore";

import { EventModel } from "../../models/EventModel"; 
import { adaptFirebaseUserToUserModel } from "../users/FireabaseToUserModel";
import { formatFirebaseTimestampToDate } from "../../utilities/FirebaseTimestampToDate";

export const adaptFirebaseEventToEventModel = (querySnapshot: QuerySnapshot<DocumentData, DocumentData>) => {
    let events = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        startDate: formatFirebaseTimestampToDate(doc.data().startDate),
        endDate: formatFirebaseTimestampToDate(doc.data().endDate),
        guests: doc.data().guests,
        eventType: doc.data().eventType,
        img: doc.data().img,
        ownersId: doc.data().owners
    } as EventModel)); 
    events.forEach((event) => {
        event.owners = []; // initialize owners array
        const ownersArray = event.ownersId; 
        event.owners = adaptFirebaseUserToUserModel(ownersArray);
    });
    return events;
}
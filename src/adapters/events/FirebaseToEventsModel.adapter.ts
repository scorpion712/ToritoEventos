import { DocumentData, QuerySnapshot } from "firebase/firestore";

import { EventModel } from "../../models/EventModel";  
import { formatFirebaseTimestampToDate } from "../../utilities/FirebaseTimestampToDate";

export const adaptFirebaseEventsToEventModel = (querySnapshot: QuerySnapshot<DocumentData, DocumentData>) => {
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

    return events;
}
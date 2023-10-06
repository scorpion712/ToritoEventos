
import { query, where } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { EventModel } from "../../models/EventModel"; 
import { db } from "../../../private/services/firebase/Firebase";
import { adaptFirebaseEventToEventModel } from "../../adapters/events/FirebaseToEventModel.adapter";
 

export const getEvents = async () => {
    let events = [] as EventModel[];
    const eventsCollectionRef = collection(db, "events");

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const givenQuery = query(eventsCollectionRef, where('startDate', '>=', thirtyDaysAgo)); 

    try {
        const querySnapshot = await getDocs(givenQuery);
        events = adaptFirebaseEventToEventModel(querySnapshot);
    } catch (error) {
        console.log("Error: ", error)
    }
    return events;
}

export const getAllEvents = async () => {
    let events = [] as EventModel[];
    const eventsCollectionRef = collection(db, "events"); 
    try {
        const querySnapshot = await getDocs(eventsCollectionRef);
        events = adaptFirebaseEventToEventModel(querySnapshot);
    } catch (error) {
        console.log("Error: ", error)
    }
    return events;
}
 
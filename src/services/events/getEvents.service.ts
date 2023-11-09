import { doc, getDoc, query, where } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

import { EventModel } from "../../models/EventModel";
import { db } from "../firebase/firebase";
import { adaptFirebaseEventToEventModel } from "../../adapters/events/FirebaseToEventModel.adapter"; 
import { adaptFirebaseUserToUserModel } from "../../adapters/users/FireabaseToUserModel";
 
 

export const getEvents = async () => {
    let events = [] as EventModel[];
    const eventsCollectionRef = collection(db, "events");

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const givenQuery = query(eventsCollectionRef, where('startDate', '>=', thirtyDaysAgo)); 

    try {
        const querySnapshot = await getDocs(givenQuery);
        events = adaptFirebaseEventToEventModel(querySnapshot);
        events.forEach((event) => {
            event.owners = []; // initialize owners array 
            event.ownersId.forEach(async (ownerId) => {
                const docRef = doc(db, "users", ownerId.trim());
                const docSnap = await getDoc(docRef);
                if (docSnap.exists())
                    event.owners.push(adaptFirebaseUserToUserModel(docSnap));
            });
        }); 
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
        events.forEach((event) => {
            event.owners = [];
            event.ownersId.forEach(async (ownerId) => {
                const docRef = doc(db, "users", ownerId.trim());
                const docSnap = await getDoc(docRef);
                if (docSnap.exists())
                    event.owners.push(adaptFirebaseUserToUserModel(docSnap));
            });
        });
    } catch (error) {
        console.log("Error: ", error)
    }
    return events;
}
 
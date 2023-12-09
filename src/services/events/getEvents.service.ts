import { doc, getDoc, query, where } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

import { EventModel } from "../../models/EventModel";
import { db } from "../firebase/firebase";
import { adaptFirebaseUserToUserModel } from "../../adapters/users/FireabaseToUserModel";
import { adaptFirebaseEventToEventModel, adaptFirebaseEventsToEventModel } from "../../adapters";
import { AppointmentOwner } from "../../models/AppointmentModel";
 
 

export const getEvents = async () => {
    let events = [] as EventModel[];
    const eventsCollectionRef = collection(db, "events");

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const givenQuery = query(eventsCollectionRef, where('startDate', '>=', thirtyDaysAgo)); 

    try {
        const querySnapshot = await getDocs(givenQuery);
        events = adaptFirebaseEventsToEventModel(querySnapshot);
        
        // Create an array of promises for each owner
        const ownerPromisesArray = events.map(async (event) => {
            event.owners = [];
            const ownerPromises = event.ownersId.map(async (ownerId) => {
                const docRef = doc(db, "users", ownerId.trim());
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return adaptFirebaseUserToUserModel(docSnap);
                }
                return {} as AppointmentOwner;
            });
            event.owners = await Promise.all(ownerPromises.filter(Boolean));
        });

        // Wait for all promises to resolve before continuing
        await Promise.all(ownerPromisesArray); 
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
        events = adaptFirebaseEventsToEventModel(querySnapshot);
        
        // Create an array of promises for each owner
        const ownerPromisesArray = events.map(async (event) => {
            event.owners = [];
            const ownerPromises = event.ownersId.map(async (ownerId) => {
                const docRef = doc(db, "users", ownerId.trim());
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return adaptFirebaseUserToUserModel(docSnap);
                }
                return {} as AppointmentOwner;
            });
            event.owners = await Promise.all(ownerPromises.filter(Boolean));
        });

        // Wait for all promises to resolve before continuing
        await Promise.all(ownerPromisesArray); 
    } catch (error) {
        console.log("Error: ", error)
    }
    
    return events;
}
 
export const getEventById = async (eventId: string) => {
    const docRef = doc(db, "events", eventId);
    const docSnap = await getDoc(docRef);
    
    let event = adaptFirebaseEventToEventModel(docSnap);
    
    // Create an array of promises for each owner
    const ownerPromises = (event?.ownersId || []).map(async (ownerId) => {
        const ownerDocRef = doc(db, "users", ownerId.trim());
        const ownerDocSnap = await getDoc(ownerDocRef);
        return ownerDocSnap.exists() ? adaptFirebaseUserToUserModel(ownerDocSnap) : {} as AppointmentOwner;
    });

    // Wait for all promises to resolve before continuing
    event.owners = await Promise.all(ownerPromises);

    return event;
}  
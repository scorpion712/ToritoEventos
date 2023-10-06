
import { Timestamp, addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db, storage } from "../../../private/services/firebase/Firebase";
import { EventModel } from "../../models/EventModel";

export const addEvent = async (event: EventModel) => { 
    const firebaseEvent = {
        eventType: event.eventType,
        endDate: Timestamp.fromDate(event.endDate),
        startDate: Timestamp.fromDate(event.startDate),
        guests: event.guests,
        title: event.title,
        img: await saveImage(event.imgFile),
        owners: [] as string []
    }

    // TO DO: validate if user exists or not
    
    event.owners.forEach(async (owner) => {
         const docRef = await addDoc(collection(db, "users"), owner);
         firebaseEvent.owners.push(docRef.id);
    });

    // Add a new document with a generated id.
    await addDoc(collection(db, "events"), firebaseEvent);
}


const saveImage = async (image: File) => {
    // Define a reference to the Firebase Storage location where you want to upload the file
    const storageRef = ref(storage, 'some-child');
    try {
        // Upload the file to Firebase Storage
        const snapshot = await uploadBytes(storageRef, image);
        
        // Get uploaded image location
        return await getDownloadURL(snapshot.ref);
    } catch (error) {
        console.error('Error uploading file:', error);
        return "";
    }
}
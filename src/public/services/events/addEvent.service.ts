import { Timestamp, doc, setDoc } from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db, storage } from "../../../private/services/firebase/firebase";
import { EventModel } from "../../models/EventModel";
import { generateFirestoreId } from "../../utilities/FirebaseIdGenerator";
import { getUsers } from "../../../private/services/users/getUsersService";
import { createUser } from "../auth/signIn.service";
import { AppointmentOwner } from "../../models/AppointmentModel";

export const addEvent = async (event: EventModel) => {
    const eventId = event.id ? event.id : generateFirestoreId(); 
    try { 
        const firebaseEvent = {
            eventType: event.eventType,
            endDate: Timestamp.fromDate(event.endDate),
            startDate: Timestamp.fromDate(event.startDate),
            guests: event.guests,
            title: event.title,
            img: await saveImage(event.imgFile, eventId),
            owners: [] as string[],
            notes: event.notes || "",
            confirmed: event.owners ? false : true
        }

        const registeredUsers = await getUsers();
        event.owners.forEach(async (owner) => {
            if (!registeredUsers.find((user: AppointmentOwner) => user.id == owner.id)) {
                // create user with default password
                const userCredential = await createUser(owner.email, "Torito23");
                // save user data
                if (userCredential) {
                    owner.id = userCredential.user.uid;
                    await setDoc(doc(db, "users", owner.id), {
                        name: owner.name || "",
                        surname: owner.surname || "",
                        phone: owner.phone || "",
                        email: owner.email || "",
                    });
                    firebaseEvent.owners.push(owner.id);
                }
            }
        });

        // Add a new document with a generated id.  
        const eventDocRef = doc(db, "events", eventId);  
        await setDoc(eventDocRef, firebaseEvent); 
    } catch (error) {
        console.log(error)
    }
}


const saveImage = async (image: File, eventId: string) => {
    if (image) {
        // Define a reference to the Firebase Storage location where you want to upload the file
        const storageRef = ref(storage, `img_${eventId}`);
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
    return "";
}
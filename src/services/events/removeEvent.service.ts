import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
 

export const deleteEvent = async (eventId: string) => { 
    // Create a reference to the file to delete
    const desertRef = ref(storage, `img_${eventId.trim()}`); 
    // Delete the file 
    deleteObject(desertRef).then(async () => {
        // delete the doc
        await deleteDoc(doc(db, "events", eventId.trim()));
    }).catch((error) => {
        console.log(error)
    });
}

import { deleteDoc, doc} from "firebase/firestore";

import { db } from "../../../private/services/firebase/Firebase";
 
export const deleteEvent = async (eventId: string) => {

    // TO DO: remove associated img
    
    await deleteDoc(doc(db, "events", eventId.trim()));
}
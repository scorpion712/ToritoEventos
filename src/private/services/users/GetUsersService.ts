import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../firebase/Firebase";

import { AppointmentOwner } from "../../../public/models/AppointmentModel";
import { adaptFirebaseUserToUserModel } from "../../../public/adapters/users/FireabaseToUserModel";

export const getUsers = async () => {
    let users = [] as AppointmentOwner[];
    const eventsCollectionRef = collection(db, "users"); 
    try {
        const querySnapshot = await getDocs(eventsCollectionRef);
        querySnapshot.docs.map(doc => {
            users.push(adaptFirebaseUserToUserModel(doc));
        })
    } catch (error) {
        console.log("Error: ", error)
    }
    return users;
}
 
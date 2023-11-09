import { Timestamp } from "firebase/firestore";

// Convert Firebase Timestamp to JavaScript Date
export const formatFirebaseTimestampToDate = (timestamp: Timestamp) => {
    return timestamp.toDate();
}
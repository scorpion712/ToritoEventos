import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../private/services/firebase/firebase";

export const authUser = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );  

    return result.user;
  
  } catch (error: any) {
    console.log(error.message);
  }
}
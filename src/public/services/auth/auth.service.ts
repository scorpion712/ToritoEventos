import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../private/services/firebase/firebase";

export const authUser = async (email: string, password: string) => {
    try {
        const user = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(user);
        return user;
      } catch (error: any) {
        console.log(error.message);
      }
}
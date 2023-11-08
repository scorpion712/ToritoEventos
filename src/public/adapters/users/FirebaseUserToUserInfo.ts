import { User } from "firebase/auth";

import { UserInfo } from "../../../models";
import { Roles } from "../../../models/roles";
import { adminEmails } from "../../../adminEmails";

export const adaptFirebaseUserCredentialToUserInfo = (user: User) => {
    return {
        id: user.uid,
        email: user.email,
        isVerified: user.emailVerified,
        name: user.displayName,
        rol: adminEmails.includes(user.email || "") ? Roles.ADMIN : Roles.USER
    } as UserInfo;
}
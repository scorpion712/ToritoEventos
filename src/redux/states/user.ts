import {createSlice } from "@reduxjs/toolkit"; 
import { UserInfo } from "../../models/user.model";
import { clearLocalStorage, persistLocalStorage } from "../../public/utilities/LocalStorage";
import { Roles } from "../../models/roles";

export const EmptyUserState: UserInfo = {
    id: "",
    name: "",
    email: "",
    accessToken: "",
    refreshToken: "",
    isVerified: false,
    rol: Roles.USER
}

export const userKey = 'user';

export const userSlice = createSlice({
    name: "user",
    initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) :EmptyUserState,
    reducers: {
        createUser: (state, action) => {
            persistLocalStorage<UserInfo>(userKey, action.payload);
            return action.payload;
        },
        updateUser: (state, action) => {
            const result = {...state, ...action.payload };
            persistLocalStorage<UserInfo>(userKey, result);
            return result;
        },
        resetUser: () => {
            clearLocalStorage(userKey);
            return EmptyUserState
        }
    }
});

export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
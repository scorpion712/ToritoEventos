import { Roles } from "./roles";

export interface UserInfo {
    id: string; 
    accessToken: string;
    refreshToken: string;
    name: string;
    email: string;
    isVerified: boolean;
    rol: Roles;
}

export interface User { 
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    isAdmin: boolean;
    state: string | null;
    city: string | null;
}
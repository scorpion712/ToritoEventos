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
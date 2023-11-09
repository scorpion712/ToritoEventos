import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes } from "../models";

function UserGuard() {
    const userState = useSelector((store: AppStore) => store.user);
console.log( userState.name , userState.isVerified )
    return userState.name && userState.isVerified ? <Outlet /> : <Navigate replace to={PrivateRoutes.REGISTRATION} />;
}

export default UserGuard;
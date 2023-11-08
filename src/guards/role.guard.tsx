import { useSelector } from "react-redux";

import { AppStore } from "../redux/store"
import { Roles } from "../models/roles";
import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../models";

interface Props {
    rol: Roles;
}

function RoleGuard({ rol }: Props) {
    const userState = useSelector((store: AppStore) => store.user);

    return userState.rol === rol ? <Outlet /> : <Navigate replace to={PublicRoutes.LOGIN} />;
}

export default RoleGuard;
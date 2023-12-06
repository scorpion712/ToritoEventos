import * as React from "react";
import {
  BrowserRouter,
  Route
} from "react-router-dom";
import { Provider } from "react-redux";

import { PrivateRoutes, PublicRoutes } from "../models";
import { AuthGuard, RoleGuard, UserGuard } from "../guards";
import store from "../redux/store";
import LoadingProgress from "../components/LoadingProgress";
import { RoutesWithNotFound } from "../utilities";
import { Roles } from "../models/roles";  
import { UserDetail } from "../pages";

const Login = React.lazy(() => import("../pages/LoginPage"));
const SignUpPage = React.lazy(() => import("../pages/SignUpPage"));
const EmailNotVerified = React.lazy(() => import("../pages/EmailNotVerified"));
const Events = React.lazy(() => import("../pages/Events"));
const Users = React.lazy(() => import("../pages/Users"));
const RegistrationPage = React.lazy(() => import("../pages/RegistrationPage"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
// const UserDetail = React.lazy(() => import("../pages/UserDetail"));

export default function Router() {
  return (
    <React.StrictMode>
      <React.Suspense fallback={<LoadingProgress />}>
        <Provider store={store}>
          <BrowserRouter>
            <RoutesWithNotFound>
              <Route element={<AuthGuard />}>
                <Route element={<RoleGuard rol={Roles.ADMIN} />}>
                  <Route path={PrivateRoutes.USERS} element={<Users />}/>
                  <Route path={`${PrivateRoutes.USERS}/:id`} element={<UserDetail />} />
                  <Route path={PrivateRoutes.EVENTS} element={<Events />} />
                  <Route path='/' element={<Dashboard />} />
                </Route>
                <Route path={PrivateRoutes.REGISTRATION} element={<RegistrationPage />} />
                <Route element={<UserGuard/>}>
                  <Route path='/' element={<Dashboard />} />
                </Route> 
              </Route>
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route path={PublicRoutes.SIGN_UP} element={<SignUpPage />} />
              <Route path={PublicRoutes.NOT_VERIFIED_EMAIL} element={<EmailNotVerified />} />
            </RoutesWithNotFound>
          </BrowserRouter>
        </Provider>
      </React.Suspense>
    </React.StrictMode>
  )
}

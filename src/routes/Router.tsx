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
import { RoutesWithNotFound } from "../public/utilities";
import { Roles } from "../models/roles"; 

const Login = React.lazy(() => import("../public/views/LoginPage"));
const SignUpPage = React.lazy(() => import("../public/views/SignUpPage"));
const EmailNotVerified = React.lazy(() => import("../public/views/EmailNotVerified"));
const Events = React.lazy(() => import("../private/pages/Events"));
const Users = React.lazy(() => import("../private/pages/Users"));
const RegistrationPage = React.lazy(() => import("../public/views/RegistrationPage"));
const Dashboard = React.lazy(() => import("../private/pages/Dashboard"));

export default function Router() {
  return (
    <React.StrictMode>
      <React.Suspense fallback={<LoadingProgress />}>
        <Provider store={store}>
          <BrowserRouter>
            <RoutesWithNotFound>
              <Route element={<AuthGuard />}>
                <Route element={<RoleGuard rol={Roles.ADMIN} />}>
                  <Route path={PrivateRoutes.EVENTS} element={<Events />} />
                  <Route path={PrivateRoutes.USERS} element={<Users />} />
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

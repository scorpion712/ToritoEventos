import * as React from "react";
import {
  BrowserRouter,
  Route
} from "react-router-dom";
import { Provider } from "react-redux";

import Dashboard from "../private/pages/Dashboard";
import Events from "../private/pages/Events";
import Users from "../private/pages/Users"; 
import SignUpPage from "../public/views/SignUpPage";
import RegistrationPage from "../public/views/RegistrationPage";
import { PublicRoutes } from "../models";
import { AuthGuard } from "../guards";
import { RoutersWithNotFound } from "../public/utilities";
import store from "../redux/store";

const Login  = React.lazy(() => import("../public/views/LoginPage"));

export default function Router() {
  return (
    <React.StrictMode>
      <React.Suspense fallback={<>Spinner</>}>
        <Provider store={store}>
          <BrowserRouter>
            <RoutersWithNotFound>
              <Route element={<AuthGuard />}>
                <Route path='/events' element={<Events />} />
                <Route path='/users' element={<Users />} />
              </Route>
              <Route path='/' element={<Dashboard />} />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route path={PublicRoutes.SIGN_UP} element={<SignUpPage />} />
              <Route path={PublicRoutes.REGISTRATION} element={<RegistrationPage />} />
            </RoutersWithNotFound>
          </BrowserRouter>
        </Provider>
      </React.Suspense>
    </React.StrictMode>
  )
}

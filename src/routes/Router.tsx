
import * as React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Dashboard from "../private/pages/Dashboard";
import ErrorPage from "../public/views/ErrorPage";
import Events from "../private/pages/Events";
import Users from "../private/pages/Users";
import LoginPage from "../public/views/LoginPage";
import SignUpPage from "../public/views/SignUpPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/events",
      element: <Events />,
    },
    {
      path: "/users",
      element: <Users />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignUpPage />,
    },
  ]);

  
export default function Router() {
    return (
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
    )
}

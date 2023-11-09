import { Route, Routes } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";

interface Props {
    children: JSX.Element | JSX.Element[];
}

function RouterWithNotFound({ children }: Props) {
    return (
        <Routes>
            {children}
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default RouterWithNotFound;
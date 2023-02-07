import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedStatuses }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return(
        auth?.status?.find(status => allowedStatuses.includes(status))
            ? <Outlet />
            : auth?.username
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/signin" state={{ from: location }} replace />
    );
}

export default RequireAuth;
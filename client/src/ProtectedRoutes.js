import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    const user = {loggedIn: true}
    return user && user.loggedIn;
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to="/auth"/>
};

export default ProtectedRoutes;
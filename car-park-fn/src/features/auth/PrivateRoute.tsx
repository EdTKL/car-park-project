import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hook";

function PrivateRoute() {
  const isAuth = useAppSelector((state) => state.auth.role);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}

export default PrivateRoute;

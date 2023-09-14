import { Outlet } from "react-router-dom";

export function AdminRoutes(){
    // const authListener = useAppSelector((state):AuthState=> state.auth)
    
    
    // if(authListener.isAuth && authListener.role === "admin"){
        return <Outlet/>;
    // } else {
        // return <Navigate to="/login" replace />;
    // }
}
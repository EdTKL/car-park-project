import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./app/hook";

import { AuthState } from "./redux/interface/model";

export function StaffRoutes(){
    // const authListener = useAppSelector((state):AuthState=> state.auth)
    
    
    // if(authListener.isAuth && authListener.role === "staff"){
        return <Outlet/>;
    // } else {
        
        // return <Navigate to="/login" replace />;
    // }
}
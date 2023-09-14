import { Outlet } from "react-router-dom";

export function StaffRoutes(){
    // const authListener = useAppSelector((state):AuthState=> state.auth)
    
    
    // if(authListener.isAuth && authListener.role === "staff"){
        return <Outlet/>;
    // } else {
        
        // return <Navigate to="/login" replace />;
    // }
}
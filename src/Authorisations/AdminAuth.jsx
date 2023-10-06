import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminAuth = ({allows})=> {
    const authstate = useSelector((state)=> state.auth)
    const location = useLocation();


    return (
        authstate?.roles == "9289"
            ? <Outlet state={{from: location}} />
            : <Navigate to="/admin/login" state={{ from: location.pathname }} replace />
           
    )
}

export default  AdminAuth;
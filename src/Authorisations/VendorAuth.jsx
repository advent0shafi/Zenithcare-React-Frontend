import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const VendorAuth = ({allows})=> {
    const authstate = useSelector((state)=> state.auth)
    const location = useLocation();


    return (
        authstate?.roles == "1200"
            ? <Outlet state={{from: location}} />
            : <Navigate to="/vendor/login" state={{ from: location.pathname }} replace />
           
    )
}


export default VendorAuth;
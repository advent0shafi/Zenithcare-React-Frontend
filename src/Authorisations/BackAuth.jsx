import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const BackAuth = () => {
    const authstate = useSelector((state)=> state.auth)
    const location = useLocation();
  return (
    authstate?.accessToken != null
        ? <Navigate to="/" state={{ from: location.pathname }} replace />
        :<Outlet state={{from: location}} />
    
) 
}

export default BackAuth;
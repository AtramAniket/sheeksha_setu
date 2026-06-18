import {Navigate} from "react-router-dom";

export default function ProtectedRoutes({children}){

	const isAuthenticated = true;

	return isAuthenticated ? children : <Navigate to = "/login" />;
}
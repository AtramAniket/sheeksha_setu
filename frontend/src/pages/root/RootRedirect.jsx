import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

function RootRedirect() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
}

export default RootRedirect;
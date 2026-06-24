import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

function RootRedirect() {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default RootRedirect;
import { useAuth } from "../context/useAuth";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Welcome, {user?.full_name}</p>

      <p>Email: {user?.email}</p>

      <p>Role: {user?.role}</p>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}
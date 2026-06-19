import { useAuth } from "@/context/useAuth";
import { Button } from "@/components/ui/button";

export default function AppLayout({ children }) {
  const { user, logout } = useAuth();

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <header className="border-b bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">Sheeksha Setu</h1>
              <p className="text-sm text-slate-500">
                Welcome, {user?.full_name || "Admin"}
              </p>
            </div>
            <Button onClick={logout}>Logout</Button>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </>
  );
}

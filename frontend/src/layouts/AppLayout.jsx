import { useAuth } from "@/context/useAuth";
import { Button } from "@/components/ui/button";

const navItems = [
  "Dashboard",
  "Students",
  "Teachers",
  "Attendance",
  "Fees",
  "Settings",
];

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function AppLayout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="hidden border-r bg-white lg:block">
        <div className="border-b px-6 py-5">
          <h1 className="text-xl font-bold">Shiksha Setu</h1>
          <p className="text-sm text-slate-500">School Management</p>
        </div>

        <nav className="p-4">
          {navItems.map((item) => (
            <Button
              key={item}
              variant={item === "Dashboard" ? "secondary" : "ghost"}
              className="mb-1 w-full justify-start"
            >
              {item}
            </Button>
          ))}
        </nav>
      </aside>

      <div>
        <header className="border-b bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Dashboard</h2>
              <p className="text-sm text-slate-500">
                Welcome, {user?.full_name || "Admin"}
              </p>
            </div>

            <div className="flex items-center gap-2">
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" className="lg:hidden">
        Menu
      </Button>
    </SheetTrigger>

    <SheetContent side="left">
      <SheetHeader>
        <SheetTitle>Shiksha Setu</SheetTitle>
      </SheetHeader>

      <nav className="mt-6 flex flex-col gap-2">
        {navItems.map((item) => (
          <Button
            key={item}
            variant={item === "Dashboard" ? "secondary" : "ghost"}
            className="justify-start"
          >
            {item}
          </Button>
        ))}
      </nav>
    </SheetContent>
  </Sheet>

  <Button onClick={logout}>Logout</Button>
</div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;

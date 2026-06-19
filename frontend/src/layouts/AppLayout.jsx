import { Link, useLocation } from "react-router-dom";

import { useAuth } from "@/context/useAuth";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Students",
    path: "/students",
  },
  {
    label: "Teachers",
    path: "/teachers",
  },
  {
    label: "Attendance",
    path: "/attendance",
  },
  {
    label: "Fees",
    path: "/fees",
  },
  {
    label: "Settings",
    path: "/settings",
  },
];

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function AppLayout({ title, description, children }) {
  const { user, logout } = useAuth();

  const location = useLocation();

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
              key={item?.label}
              variant={
                item?.path === location?.pathname ? "secondary" : "ghost"
              }
              className="mb-1 w-full justify-start"
            >
              <Link to={item.path}>{item.label}</Link>
            </Button>
          ))}
        </nav>
      </aside>

      <div>
        <header className="border-b bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-sm text-slate-500">
                {description}
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
                        key={item?.label}
                        variant={
                          item?.label === "Dashboard" ? "secondary" : "ghost"
                        }
                        className="justify-start"
                      >
                        <Link to={item?.path}>{item?.label}</Link>
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

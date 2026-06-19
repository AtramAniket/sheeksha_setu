import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useAuth } from "@/context/useAuth";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <>
      <AppLayout>
        <main className="min-h-screen bg-slate-50 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-slate-600">
                Welcome back, {user?.full_name || "Admin"}
              </p>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Menu</Button>
              </SheetTrigger>

              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Shiksha Setu</SheetTitle>
                </SheetHeader>

                <nav className="mt-6 flex flex-col gap-3">
                  <Button variant="ghost" className="justify-start">
                    Dashboard
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    Students
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    Teachers
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    Fees
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    Settings
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">0</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Teachers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">0</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Today's Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">0%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">₹0</p>
              </CardContent>
            </Card>
          </section>
        </main>
      </AppLayout>
    </>
  );
}

export default DashboardPage;

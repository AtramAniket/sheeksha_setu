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
      <AppLayout title = "Dashboard" description={`Welcome, ${user?.full_name || "Admin"}`}>
        <main className="min-h-screen bg-slate-50 p-6">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

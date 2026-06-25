import apiClient from "@/api/client";
import { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import { useAuth } from "@/context/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


function DashboardPage() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    total_students: 0,
    total_teachers: 0,
    attendance_today: 0,
    pending_fees: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        const response = await apiClient.get("/dashboard/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardStats();
  }, []);

  return (
    <AppLayout
      title="Dashboard"
      description={`Welcome, ${user?.full_name || "Admin"}`}
    >
      <main className="min-h-screen bg-slate-50 p-6">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {loading ? "..." : stats.total_students}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {loading ? "..." : stats.total_teachers}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today's Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {loading ? "..." : `${stats.attendance_today}%`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {loading ? "..." : `₹${stats.pending_fees}`}
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </AppLayout>
  );
}

export default DashboardPage;
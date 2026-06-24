import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootRedirect from "./pages/root/RootRedirect";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import PublicRoute from "./routes/PublicRoute";
import ProtectedRoutes from "./routes/ProtectedRoutes";

import FeesPage from "./pages/FeesPage";
import TeachersPage from "./pages/TeachersPage";
import SettingsPage from "./pages/SettingsPage";
import DashboardPage from "./pages/DashboardPage";
import AttendancePage from "./pages/AttendancePage";

import StudentsPage from "./pages/students/StudentsPage";
import StudentsEditPage from "./pages/students/StudentsEditPage";
import StudentCreatePage from "./pages/students/StudentsCreatePage";
import StudentDetailsPage from "./pages/students/StudentDetailsPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRedirect />} />

          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>} />

          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <DashboardPage />
              </ProtectedRoutes>
            }
          />

          <Route path="/students">
            <Route
              index
              element={
                <ProtectedRoutes>
                  <StudentsPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="create"
              element={
                <ProtectedRoutes>
                  <StudentCreatePage />
                </ProtectedRoutes>
              }
            />
            <Route
              path=":id"
              element={
                <ProtectedRoutes>
                  <StudentDetailsPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path=":id/edit"
              element={
                <ProtectedRoutes>
                  <StudentsEditPage />
                </ProtectedRoutes>
              }
            />
          </Route>

          <Route
            path="/teachers"
            element={
              <ProtectedRoutes>
                <TeachersPage />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/attendance"
            element={
              <ProtectedRoutes>
                <AttendancePage />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/fees"
            element={
              <ProtectedRoutes>
                <FeesPage />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoutes>
                <SettingsPage />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </>
  );
}

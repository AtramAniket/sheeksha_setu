import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoutes from "./routes/ProtectedRoutes";

import FeesPage from "./pages/FeesPage";
import TeachersPage from "./pages/TeachersPage";
import SettingsPage from "./pages/SettingsPage";
import DashboardPage from "./pages/DashboardPage";
import AttendancePage from "./pages/AttendancePage";

import StudentsPage from "./pages/students/StudentsPage";
import StudentCreatePage from "./pages/students/StudentsCreatePage";
import StudentsEditPage from "./pages/students/StudentsEditPage";
import StudentDetailsPage from "./pages/students/StudentDetailsPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

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

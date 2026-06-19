import {BrowserRouter, Routes, Route} from "react-router-dom";

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentsPage from "./pages/StudentsPage";
import DashboardPage from './pages/DashboardPage';

import ProtectedRoutes from './routes/ProtectedRoutes';
import TeachersPage from "./pages/TeachersPage";
import AttendancePage from "./pages/AttendancePage";
import FeesPage from "./pages/FeesPage";
import SettingsPage from "./pages/SettingsPage";

export default function App(){

  return(

      <>
        <BrowserRouter>
          
          <Routes>
            
            <Route path="/login" element={ <LoginPage/> }/>

            <Route path="/register" element={ <RegisterPage/> }/>

            <Route path="/dashboard" element={ 
              <ProtectedRoutes>
                <DashboardPage/>
              </ProtectedRoutes>
              }
            />

            <Route path="/students" element={ 
              <ProtectedRoutes>
                <StudentsPage/>
              </ProtectedRoutes>
              }
            />

            <Route path="/teachers" element={ 
              <ProtectedRoutes>
                <TeachersPage/>
              </ProtectedRoutes>
              }
            />

            <Route path="/attendance" element={ 
              <ProtectedRoutes>
                <AttendancePage/>
              </ProtectedRoutes>
              }
            />

            <Route path="/fees" element={ 
              <ProtectedRoutes>
                <FeesPage/>
              </ProtectedRoutes>
              }
            />

            <Route path="/settings" element={ 
              <ProtectedRoutes>
                <SettingsPage/>
              </ProtectedRoutes>
              }
            />

          </Routes>

        </BrowserRouter>
      </>
    )
}
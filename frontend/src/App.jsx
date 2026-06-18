import {BrowserRouter, Routes, Route} from "react-router-dom";

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

import ProtectedRoutes from './routes/ProtectedRoutes';

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

          </Routes>

        </BrowserRouter>
      </>
    )
}
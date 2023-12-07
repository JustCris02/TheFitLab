import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar"
import {Route,Routes,Link} from "react-router-dom"
import HomePage from "./pages/HomePage"
import PrivateRoute from './routes/privateRoute'
import PublicRoute from "./routes/publicRoute"
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login"
import SignUp from "./pages/SignUp";

export default function App(){

  const [isLogin, setIsLogin] = useState(false)

    const logout = () => {
        localStorage.removeItem('token');
        setIsLogin(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            setIsLogin(true);    
        }
    }, [])
    
  return(
    <div className = "container">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/" element={<PublicRoute/>}>
            <Route path='/login' element={<Login login={() => setIsLogin(true)} />}/>
            <Route path='/signup' element={<SignUp/>}/>
        </Route>

        <Route path="/" element={<PrivateRoute/>}>
            <Route path="/dashboard" element={<Dashboard />}/>
        </Route>

      </Routes>
    
    </div>

 
  );
}

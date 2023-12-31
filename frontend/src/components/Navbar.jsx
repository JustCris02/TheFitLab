import { Link } from "react-router-dom"
import logo from "../images/logo.png"
import React, { useEffect, useState } from 'react';

// const token = localStorage.getItem('token');

export default function Navbar(props) {
    // const [token, setToken] = useState(null);

    // useEffect(() => {
    //     setToken(localStorage.getItem('token'))
    // }, [])
    
    // const logout = () => {
    //     localStorage.removeItem('token')
    //     setToken(null);
    // };
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="FitLab logo" className="logo"
                         style={{ width: '50px', marginRight: '10px' }}/> TheFitLab
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                        </li>
                        {!props.isLogin && (
                            <>
                                <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
                                <li className="nav-item"><Link to="/signup" className="nav-link">SignUp</Link></li>
                            </>
                        )}
                        {props.isLogin && (
                            <>
                                <li className="nav-item"><Link to="/dashboard" className="nav-link">Programs</Link></li>
                                <li className="nav-item"><Link onClick={() => props.logout()} className="nav-link">Logout</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

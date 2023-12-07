import axios from "axios";
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"

export default function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignup = async () => {
        try {
            await axios.post('http://localhost:5000/api/signup', { email, password, name });
            console.log('User created successfully');
            navigate('/login');
        } catch (error) {
            setErrorMessage(error.response.data.message);
            console.error('Error creating user:', error.response.data.message);
        }
    };
    
    return (
        <>
            <div className="auth-form-container">
                <form className="auth-form">
                    <div className="auth-form-content">
                        <h3 className="auth-form-title">Sign Up</h3>
                        <div className="text-center">
                            {" "} <br/>
                            {errorMessage && (<div>{errorMessage}</div>)}
                        </div>
                        <div className="form-group mt-3">
                            <label>Name</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="button" onClick={handleSignup} className="btn btn-primary">
                                Sign Up
                            </button>
                        </div>
                        <p className="text-center mt-2">
                            Already registered? {" "}
                            <Link className="link-primary" to="/login">Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}

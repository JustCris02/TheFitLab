import axios from "axios";
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"

export default function Login(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        setErrorMessage('');
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            props.login();
            navigate('/dashboard');
            console.log('Login successful. Token:', response.data.token);
        } catch (error) {
            setErrorMessage(error.response.data.message);
            console.error('Error logging in:', error.response.data.message);
        }
    };

    return (
        <>
            <div className="auth-form-container">
                <form className="auth-form">
                    <div className="auth-form-content">
                        <h3 className="auth-form-title">Sign In</h3>
                        <div className="text-center">
                            {" "} <br/>
                            {errorMessage && (<div>{errorMessage}</div>)}
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
                            <button type="button" onClick={handleLogin} className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        <p className="text-center mt-2">
                            Not registered yet? {" "}
                            <Link className="link-primary" to="/signup">Sign Up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}

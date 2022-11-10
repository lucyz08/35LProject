import React, { useState } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom'

export default function (props) { 
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('/home')
    };

    let [authMode, setAuthMode] = useState("signin")

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }
    if (authMode === "signin") {
        return (
            <div className="Auth-from-container">
                    <form className="Auth-form" >
                        <div className="Auth-from-content">
                            <h3 className="Auth-form-title">Login</h3>
                            <div className="text-center">Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                                Sign up
                            </span>
                            </div>
                            <div className="form-group-mt-3">
                                <label>Username</label>
                                <input 
                                    type="username"
                                    className="form-control mt-1"
                                    placeholder="enter username"
                                    />
                            </div>
                            <div className="form-group-mt-3">
                                <label>Password</label>
                                <input 
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="enter password"
                                    />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button onClick={navigateToHome} type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                )
        }

        return (
            <div className="Auth-form-container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign Up</h3>
                        <div className="text-center">
                            Already registered?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                                Sign in
                            </span>
                        </div>
                        <div className="form-group mt-3">
                            <label>Full Name</label>
                            <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Jane Doe"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Email</label>
                            <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="email@gmail.com"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="password"
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button onClick={navigateToHome} type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

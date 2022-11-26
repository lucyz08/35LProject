import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signin } from "../../actions/userFetching";
import './form.css'

export const SignInForm = () => {
    const [dataOfUser, setData] = useState({
        username: '', password: ''
    });

    const dispatch = useDispatch();

    const doAuthSubmission = (e) =>{
        e.preventDefault();
        dispatch(signin(dataOfUser));
    }
    return (
        <div className="Signin-form-container">
            <h2 className="signInHeading">Welcome Back!</h2>
            <form className="Signin-form" onSubmit={doAuthSubmission}>
                <h3 className="signinLabel">Sign In</h3>
                <label className="username" for="username">Username</label>
                <input value={dataOfUser.prompt} onChange={(e) => setData({ ...dataOfUser, username: e.target.value })} type="username" placeholder="username" id="username" name="username"/>

                <label className="password" for="password">Password</label>
                <input value={dataOfUser.password} onChange={(e) => setData({ ...dataOfUser, password: e.target.value })} type="password" placeholder="password" id="password" name="password"/>

                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}
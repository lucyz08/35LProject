import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {signup} from '../../actions/userFetching'
import './form.css'

export const SignUpForm = () => {
    const [dataOfUser, setData] = useState({
        username: '', password: '', confirmPassword: '',
    });

    const dispatch = useDispatch();

    const doAuthSubmission = (e) =>{
        e.preventDefault();
        console.log(dataOfUser);
        dispatch(signup(dataOfUser));
    }
    return (
        <div className="Signup-form-container">
            <h2 className="signUpHeading">Welcome!</h2>
            <form className="Signup-form" onSubmit={doAuthSubmission}>
                <h3 className="confirmPassword">Sign Up</h3>
                <label className="username" for="username">Username</label>
                <input value={dataOfUser.username} onChange={(e) => setData({ ...dataOfUser, username: e.target.value })} type="username" placeholder="username" id="username" name="username"/>

                <label className="password" for="password">Password</label>
                <input value={dataOfUser.password} onChange={(e) => setData({ ...dataOfUser, password: e.target.value })} type="password" placeholder="password" id="password" name="password"/>

                <label className="confirmPassword" for="confirmPassword">Confirm Password</label>
                <input value={dataOfUser.confirmPassword} onChange={(e) => setData({ ...dataOfUser, confirmPassword: e.target.value })} type="confirmPassword" placeholder="confirm password" id="confirmPassword" name="confirmPassword"/>

                <button type="submit">Create Profile</button>
            </form>
        </div>
    );
}
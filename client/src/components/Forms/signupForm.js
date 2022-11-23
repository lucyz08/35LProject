import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {createUserProfile} from '../../actions/userFetching'
import './form.css'

export const SignUpForm = () => {
    const [dataOfUser, setData] = useState({
        username: '', password: ''
    });

    const dispatch = useDispatch();

    const doAuthSubmission = (e) =>{
        e.preventDefault();
        console.log(dataOfUser);
        dispatch(createUserProfile(dataOfUser));
    }
    return (
        <div className="Signup-form-container">
            <h2>Welcome!</h2>
            <form className="Signup-form" onSubmit={doAuthSubmission}>
                <h3>Sign Up</h3>
                <label className="username" for="username">Username</label>
                <input value={dataOfUser.username} onChange={(e) => setData({ ...dataOfUser, username: e.target.value })} type="username" placeholder="username" id="username" name="username"/>

                <label className="password" for="password">Password</label>
                <input value={dataOfUser.password} onChange={(e) => setData({ ...dataOfUser, password: e.target.value })} type="password" placeholder="password" id="password" name="password"/>

                <button type="submit">Create Profile</button>
            </form>
        </div>
    );
}
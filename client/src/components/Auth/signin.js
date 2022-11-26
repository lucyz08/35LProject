import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAuthCheck } from "../../actions/userFetching";
import { SignInForm } from "../Forms/loginForm";
import { SignUpForm } from "../Forms/signupForm";
import './form.css'

const Login = () => {

    return(
        <div>
            <SignInForm/>
        </div>
    )
}

export default Login
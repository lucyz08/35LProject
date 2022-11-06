import React, { useState } from "react";

export const Register = (props) => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username)
    }


    return (
        <div className="auth-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <label for="name">full name</label>
                <input value={name} name="name" id="name" placeholder="Full Name"/>

                <label for="username">username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="your username" id="username" name="email"/>

                <label for="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>

                <button type="submit">Login</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div> 
    )   
}
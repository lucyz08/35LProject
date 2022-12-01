import { useDispatch } from "react-redux";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import './styles.css';

export default function Navbar() {
    const dispatch = useDispatch();
    const path = window.location.pathname
    const [isNavExpanded, setIsNavExpanded] = useState(false)

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [data, setUserData] = useState(JSON.parse(localStorage.getItem('userdata')))

    const logout = () => {
        dispatch({type: 'LOGOUT'});
        setUser(null);
        window.location.assign("http://localhost:3000/signin")
    }
    
    useEffect(() => {
        const token = user?.token

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [])
    console.log(user)

    useEffect(() => {
        const token = user?.token

        setUserData(JSON.parse(localStorage.getItem('userdata')))
    }, [])
    console.log(data)

    return (
        <nav className="nav">
            <Link to="/" className="siteTitle">
            Arpeggio
        </Link>
        <button className="navBut"
            onClick={() => {
                setIsNavExpanded(!isNavExpanded);
            }}>
        </button>
        <div
            className= { isNavExpanded ? "nav-menu expanded" : "nav-menu" }> 
                {user ? (
                    <ul>
                        <Checkact to="/">Home</Checkact>
                        <Checkact to="/profile">Profile</Checkact>
                        <Checkact to="/friends">Friends</Checkact>
                        <Checkact to="/about">About</Checkact>
                    </ul>
                ) : (
                    <ul>
                        <Checkact to="/">Home</Checkact>
                        <Checkact to="/about">About</Checkact>
                        <Checkact to="/signin">Sign In</Checkact>
                        <Checkact to="/signup">Sign Up</Checkact>
                    </ul>
                )}
                 <button className="logOutButton"
                    onClick={() => {
                    logout();
                }}>Log Out</button>
        </div>
        </nav>
    ) 
}

function Checkact({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}
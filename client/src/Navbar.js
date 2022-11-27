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

    const logout = () => {
        dispatch({type: 'LOGOUT'});
        setUser(null);
        window.location.reload()
    }
    
    useEffect(() => {
        const token = user?.token

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [])
    console.log(user)
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
            <button className="logOutButton"
            onClick={() => {
                logout();
            }}>Log Out</button>
            <ul>
                <Checkact to="/">Home</Checkact>
                <Checkact to="/about">About</Checkact>
            </ul>
                {user ? (
                    <ul>
                        <Checkact to="/profile">Profile</Checkact>
                        <Checkact to="/friends">Friends</Checkact>                    
                    </ul>
                ) : (
                    <ul>
                        <Checkact to="/signin">Sign In</Checkact>
                        <Checkact to="/signup">Sign Up</Checkact>
                    </ul>
                )}
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
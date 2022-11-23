import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import './styles.css';
import { useState } from  "react";

export default function Navbar() {
    const path = window.location.pathname
    const [isNavExpanded, setIsNavExpanded] = useState(false)

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
            <ul>
                <Checkact to="/">Home</Checkact>
                <Checkact to="/profile">Profile</Checkact>
                <Checkact to="/friends">Friends</Checkact>
                <Checkact to="/about">About</Checkact>
                <Checkact to="/login">Sign In</Checkact>
                <Checkact to="/signup">Sign Up</Checkact>
                <Checkact to="/login">Log Out</Checkact>
            </ul> 
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
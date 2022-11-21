import { Link, useMatch, useResolvedPath } from "react-router-dom"
import './styles.css';

export default function Navbar() {
    const path = window.location.pathname
    return (
        <nav className="nav">
            <Link to="/" className="siteTitle">
            Arpeggio
        </Link>
        <ul>
            <Checkact to="/profile">Profile</Checkact>
            <Checkact to="/friends">Friends</Checkact>
            <Checkact to="/about">About</Checkact>
        </ul> 
        </nav>
    ) 
    /*<nav className="nav">
        <Link to="/" className="site-title">
            Arpeggio
        </Link>
        <ul>
            <Checkact to="/profile">Profile</Checkact>
            <Checkact to="/friends">Friends</Checkact>
            <Checkact to="/about">About</Checkact>
        </ul> 
    </nav> */
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
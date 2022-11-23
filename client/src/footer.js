import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "./footer.css"


import React from 'react';

const Footer = () => {
    return (
        <footer>
                <div className="row">
                    {/* column 1 */}
                    <div className="col">
                        Made by&nbsp;
                        <a className="gitlink" href="https://www.linkedin.com/in/lucyzises" target="_blank" rel="noreferrer">
                                Gene
                        </a>
                        ,&nbsp;
                        <a className="gitlink" href="https://www.linkedin.com/in/jake-ekoniak" target="_blank" rel="noreferrer">
                                Jake
                        </a>
                        ,&nbsp;
                        <a className="gitlink" href="https://www.linkedin.com/in/lucyzises" target="_blank" rel="noreferrer">
                                Lucy
                        </a>
                        ,&nbsp;
                        <a className="gitlink" href="https://www.linkedin.com/in/lucyzises" target="_blank" rel="noreferrer">
                                Pink
                        </a>
                        , and&nbsp;
                        <a className="gitlink" href="https://www.linkedin.com/in/rohanjaain" target="_blank" rel="noreferrer">
                                Rohan
                        </a>
                    </div>
                    {/* column 2 */}
                    <ul className="links">
                        <Checkact to="/" className="link">Home</Checkact>
                        |
                        <Checkact to="/profile" className="link">Profile</Checkact>
                        |
                        <Checkact to="/friends" className="link">Friends</Checkact>
                        |
                        <Checkact to="/about" className="link">About</Checkact>
                        |
                        <a className="link" href="https://www.linkedin.com/in/lucyzises" target="_blank" rel="noreferrer">
                                Github
                        </a>
                    </ul>
                </div>
        </footer>
        
    )
    
}

export default Footer;


function Checkact({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}

/*
<p>Check out our github repository!</p>
                        <div>
                            <a className="github" href="https://github.com/lucyz08/35LProject" target="_blank" rel="noreferrer">
                                <i class="fa-brands fa-square-github"></i>
                            </a>
                        </div>
*/
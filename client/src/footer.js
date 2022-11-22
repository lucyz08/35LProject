import "./footer.css"

import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="main-footer">
            <div className="container">
                <div className="row">
                    {/* column 1 */}
                    <div className="col">
                        <p>This website was made by Jake, Gene, Rohan, Pink, and Lucy for a CS35L Project.</p>
                    </div>
                    {/* column 2 */}
                    <div className="col">
                        <p>Links to other pages can go here</p>
                    </div>
                    {/* column 3 */}
                    <div className="col">
                        <p>Check out our github repository!</p>
                        <div>
                            <a className="github" href="https://github.com/lucyz08/35LProject" target="_blank" rel="noreferrer">
                                <i class="fa-brands fa-square-github"></i>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </footer>
        
    )
    
}

export default Footer;
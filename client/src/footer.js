import "./footer.css"

import React from 'react'


const Footer = () => {
    return (
        <footer>
            <div className="main-footer">
            <div className="container">
                <div className="row">
                    {/* column 1 */}
                    <div className="col">
                        <h4>This is a footer</h4>
                    </div>
                    {/* column 2 */}
                    <div className="col">
                    <h4>Here we can put links to other pages</h4>
                    </div>
                    {/* column 3 */}
                    <div className="col">
                    <h4>here we can put the github</h4>
                    </div>
                </div>
            </div>
        </div>
        </footer>
        
    )
    
}

export default Footer;
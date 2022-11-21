import './about.css'

export default function About(){
    return (
        <>
        <h1 className="title">Meet the Team</h1>
        <div>
            <div className="title2">Frontend</div>
            <div className="front">
                <div className="one">
                    <img className="frontface" src="../images/LucyProject.png" alt=""></img>
                    <div>
                        <div className="person">
                            <h2 className="name">Lucy Zises</h2>
                            <p className="desc">Major: Computer Science</p>
                        </div>
                        <div>
                            <a className="linkedin" href="https://www.linkedin.com/in/lucyzises" target="_blank" rel="noreferrer">
                                <i class="fa-brands fa-linkedin"></i>
                            </a>
                            <a className="github" href="https://github.com/lucyz08" target="_blank" rel="noreferrer">
                                <i class="fa-brands fa-square-github"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="one">
                    <img className="frontface" src="../images/JakeFace.JPEG" alt=""></img>
                    <div>
                        <div className="person">
                            <h2 className="name">Jake Ekoniak</h2>
                            <p className="desc">Major: Math of Computation</p>
                        </div>
                        <div>
                            <a className="linkedin" href="https://www.linkedin.com/in/jake-ekoniak" target="_blank" rel="noreferrer">
                                <i class="fa-brands fa-linkedin"></i>
                            </a>
                            <a className="github" href="https://github.com/classjek" target="_blank" rel="noreferrer">
                                <i class="fa-brands fa-square-github"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="title2">Backend</div>
            <div className="back">
                <div className="two">
                    <img className="backface" src="../images/Geneface.JPEG" alt=""></img>
                    <div>
                        <div className="person">
                            <h2 className="name">Gene Bordegaray</h2>
                            <p className="desc">Major: Computer Science</p>
                        </div>
                        <div>
                            <a className="linkedin" href="https://www.linkedin.com/in/jake-ekoniak" target="_blank" rel="noreferrer">
                                <i class="fa-brands fa-linkedin"></i>
                            </a>
                            <a className="github" href="https://github.com/genebordegaray" target="_blank" rel="noreferrer">
                                <i class="fa-brands fa-square-github"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="two">
                    <img className="backface" src="../images/spidey.png" alt=""></img>
                    <div>
                        <div className="person">
                            <h2 className="name">Rohan Jain</h2>
                            <p className="desc">Major: Computer Science</p>
                            </div>
                        <div>
                            <a className="linkedin" href="https://www.linkedin.com/in/rohanjaain" target="_blank" rel="noreferrer">
                                <i class="fa-brands fa-linkedin"></i>
                            </a>
                            <a className="github" href="https://github.com/dohboiroh" target="_blank" rel="noreferrer">
                                <i class="fa-brands fa-square-github"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="two">
                <img className="backface" src="../images/noam.jpg" alt=""></img>
                    <div>
                        <div className="person">
                            <h2 className="name">Liz Manka</h2>
                            <p className="desc">Major: Computer Science</p>
                        </div>
                        <div>
                            <a className="linkedin" href="https://www.linkedin.com/in/jake-ekoniak" target="_blank" rel="noreferrer">
                                <i class="fa-brands fa-linkedin"></i>
                            </a>
                            <a className="github" href="https://github.com/pinklz" target="_blank" rel="noreferrer">
                                <i class="fa-brands fa-square-github"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

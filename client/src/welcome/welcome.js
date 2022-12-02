import './welcome.css'

export default function Welcome(){
    return(
        <div className="gradient">
        <div className="drumPic">
        
        <div className="titleArea">
            <h2 className="welcomeTitle">Welcome to Arpeggio!</h2>
            <h3 className="welcomeSub">a new way to share music</h3>
        </div>
        </div>
        <div className="aboutSect">
            <h2 className="tagline">Get prompts, post a song.</h2>
        <div className="instructionManual">
        
            <div className="col1">
                <h1 className="instructions1">Our Purpose</h1>
                <p className="fluff">Arpeggio aims to give people a new way to share what they're listening to</p>
            </div>

            <div  className="col2">
                <h1 className="instructions2">Untethered Creativity</h1>
                <p className="fluff">Search for songs through Spotify's entire song database</p>      
            </div>

            <div  className="col3">
                <h1 className="instructions3">Find Your Sound</h1>
                <p className="fluff">Expand your taste with playlists curated just for you based on what your friends are listening to</p>
            </div>
        
        </div>
        </div>
        </div>
    )
}
import './welcome.css'

export default function Welcome(){
    return(
        <>
        <div className="drumPic">
        
        <div className="titleArea">
            <h2 className="welcomeTitle">Welcome to Arpeggio!</h2>
            <h3 className="welcomeSub">a new way to share music</h3>
        </div>
        </div>
        <div className="aboutSect">
            <h2 className="tagline">Get prompts, post a song.</h2>
        <div className="instructionManual">
            <p className="instructions1">You'll be prompted with a question. Respond by searching for a song.</p>
            <p className="instructions2">Add friends. See their responses.</p>
            <p className="instructions3">Browse playlists of responses, organized by prompt.</p>
        </div>
        </div>

        <div className="redirect">
            <h1 className="getSharing">Get sharing!</h1>
            <h2 className="welcomeLinks"><a className="link1" href="http://localhost:3000/">Home</a> • <a className="link2" href="http://localhost:3000/profile">Profile</a> • <a className="link3" href="http://localhost:3000/friends">Friends</a></h2>
        </div>
  

        </>
    )
}
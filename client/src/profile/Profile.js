import './profile.css'

import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Prompts from '../components/Prompts/printPrompts';


const Profile = () => {

    const dispatch = useDispatch();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    useEffect(() => {
        const token = user?.token

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [])

    const [data, setUserData] = useState(JSON.parse(localStorage.getItem('userdata')))
    useEffect(() => {
        const token = user?.token

        setUserData(JSON.parse(localStorage.getItem('userdata')))
    }, [])

    const [prompt, setPrompt] = useState(JSON.parse(localStorage.getItem('currentPrompt')))
    useEffect(() => {
        setPrompt(JSON.parse(localStorage.getItem('currentPrompt')))
    }, [])

    const [responses, setResponse] = useState(JSON.parse(localStorage.getItem('userresponse')))
    useEffect(() => {
        setResponse(JSON.parse(localStorage.getItem('userresponse')))
    }, [])


    const friendResults = [];
    if (data)
    {
        if (data.friends)
        {
            for (const friend of data.friends) {
                friendResults.push(
                <div >
                    <div>User: {friend}</div>
                    <hr />
                </div>,
                );
            }
        }
    }

    const displayResponse = []
    if (data)
    {
        if (responses)
        {
            for (const response of responses[0]) {
                if (response.prompt === prompt._id)
                {
                    displayResponse.push(
                    <div >
                        <div>{response.name}</div>
                        <hr />
                    </div>,
                    );
                }
            }
        }
    }


    const playlist1Results = [];
    if (data)
    {
        if (data.playlist1)
        {
            for (const song of data.playlist1) {
                playlist1Results.push(
                <div >
                    <div>Song: {song.name}</div>
                    <hr />
                </div>,
                );
            }
        }
    }
    const playlist2Results = [];
    if (data)
    {
        if (data.playlist2)
        {
            for (const song of data.playlist2) {
                playlist2Results.push(
                <div >
                    <div>Song: {song.name}</div>
                    <hr />
                </div>,
                );
            }
        }
    }
    const playlist3Results = [];
    if (data)
    {
        if (data.playlist3)
        {
            for (const song of data.playlist3) {
                playlist3Results.push(
                <div >
                    <div>Song: {song.name}</div>
                    <hr />
                </div>,
                );
            }
        }
    }
    const playlist4Results = [];
    if (data)
    {
        if (data.playlist4)
        {
            for (const song of data.playlist4) {
                playlist4Results.push(
                <div >
                    <div>Song: {song.name}</div>
                    <hr />
                </div>,
                );
            }
        }
    }
    const playlist5Results = [];
    if (data)
    {
        if (data.playlist5)
        {
            for (const song of data.playlist5) {
                playlist5Results.push(
                <div >
                    <div>Song: {song.name}</div>
                    <hr />
                </div>,
                );
            }
        }
    }

    return (
    <>
    <div className="topPic">
        <h1 className="head">all about you</h1>
    </div>
    <div className="todayAnswer">
            <h2 className="tprompt">Current Prompt: </h2>
            <div className="todayprompt">
                {prompt.prompt}
            </div>
            <div className="todayresponse">
                <h2 className="tresponse">{displayResponse}</h2>
            </div>
    </div>
    <div>
        <div className="profileMain">
            <div className="friends">
                <h3 className="friendTitle">Your Friends</h3>
                <div className="yourfriends">
                         {friendResults}
                </div>
            </div>
            <div className="playlist">
                <h3 className="playlistTitle">Your Playlists</h3>
                <div className="yourplaylist">
                    <div>
                        {playlist1Results}
                    </div>
                    <div>
                        {playlist2Results}
                    </div>
                    <div>
                        {playlist3Results}
                    </div>
                    <div>
                        {playlist4Results}
                    </div>
                    <div>
                        {playlist5Results}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    );
}

export default Profile
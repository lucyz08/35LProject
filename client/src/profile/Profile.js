import './profile.css'

import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { compileResponses } from '../actions/userFetching';

const Profile = () => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(compileResponses());
    }, [dispatch]);

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
        if (data.playlist1.length > 0)
        {
            playlist1Results.push(
            <div>Prompt: {data.playlist1[0].prompt}</div>
            )
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
        if (data.playlist2.length > 0)
        {
            playlist2Results.push(
                <div>Prompt: {data.playlist2[0].prompt}</div>
            )
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
        if (data.playlist3.length > 0)
        {
            playlist3Results.push(
                <div>Prompt: {data.playlist3[0].prompt}</div>
            )
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
        if (data.playlist4.length > 0)
        {
            playlist4Results.push(
                <div>Prompt: {data.playlist4[0].prompt}</div>
            )
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
        if (data.playlist5.length > 0)
        {
            playlist5Results.push(
                <div>Prompt: {data.playlist5[0].prompt}</div>
            )
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
                Response: {prompt.prompt}
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
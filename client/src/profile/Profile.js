import './profile.css'

import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { compileResponses } from '../actions/userFetching';


const Profile = () => {

    function arrayToString(array){
        var artistString = array.join(', ');
        return artistString
    }

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
                    <div>{friend}</div>
                </div>,
                );
            }
        }
    }

    const displayResponse = []
    console.log(Object.keys(responses))
    if (data)
    {
        if (responses)
        {
            {Object.keys(responses).map((key, index) => {
                if(responses[key][0].user === data.username)
                {
                    for (const songEntries of responses[key])
                    {
                        if (songEntries.prompt === prompt.prompt)
                        {
                            displayResponse.push(
                            <div className="profileIndividualSong">
                                <div>
                                    <img className="profileSongImg" src = {songEntries.song.albumCoverURL} width={70} height={70} alt="Image cannot be displayed"/>
                                </div>
                                <div className="songartist">
                                    <h3 className="songName">Song: {songEntries.song.name}</h3>
                                    <h3 className="artistName">Album: {songEntries.song.album}</h3>
                                </div>
                                <div className="album">
                                    <h3 className="albumName">Artist: {arrayToString(songEntries.song.artists)}</h3>
                                </div>
                            </div>,
                            );
                        }
                    }
                };
              })}
            // console.log(responses)
            // for (const response of responses[0]) {
            //     if (response.prompt === prompt.prompt)
            //     {
            //         console.log(response.song.name)
            //         displayResponse.push(
            //         <div className="profileIndividualSong">
            //             <div>
            //                 <img className="profileSongImg" src = {response.song.albumCoverURL} width={70} height={70} alt="Image cannot be displayed"/>
            //             </div>
            //             <div className="songartist">
            //                 <h3 className="songName">Song: {response.song.name}</h3>
            //                 <h3 className="artistName">Album: {response.song.album}</h3>
            //             </div>
            //             <div className="album">
            //                 <h3 className="albumName">Artist: {arrayToString(response.song.artists)}</h3>
            //             </div>
            //         </div>,
            //         );
            //     }
            // }
        }
    }

    
    const playlist1Results = [];
    if (data)
    {
        if (data.playlist1.length > 0)
        {
            playlist1Results.push(
            <div className="friendPrompt">Prompt: {data.playlist1[0].prompt}</div>
            )
            for (const iter of data.playlist1) {
                playlist1Results.push(
                <div className="friendRec">
                    <div className="friend">
                        <h3 className="friendName">{iter.user}</h3>
                    </div>
                <div className="profileIndividualSong">
                    <div>
                        <img className="profileSongImg" src = {iter.song.albumCoverURL} width={55} height={55} alt="Image cannot be displayed"/>
                    </div>
                    <div className="songartist">
                        <h3 className="songName">{iter.song.name}</h3>
                        <h3 className="artistName">{arrayToString(iter.song.artists)}</h3>
                    </div>
                    <div className="album">
                        <h3 className="albumName">{iter.song.album}</h3>
                    </div>
                </div>
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
                <div className="friendPrompt">Prompt: {data.playlist2[0].prompt}</div>
            )
            for (const iter of data.playlist2) {
                playlist2Results.push(
                    <div className="friendRec">
                    <div className="friend">
                        <h3 className="friendName">{iter.user}</h3>
                    </div>
                <div className="profileIndividualSong">
                    <div>
                        <img className="profileSongImg" src = {iter.song.albumCoverURL} width={55} height={55} alt="Image cannot be displayed"/>
                    </div>
                    <div className="songartist">
                        <h3 className="songName">{iter.song.name}</h3>
                        <h3 className="artistName">{arrayToString(iter.song.artists)}</h3>
                    </div>
                    <div className="album">
                        <h3 className="albumName">{iter.song.album}</h3>
                    </div>
                </div>
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
                <div className="friendPrompt">Prompt: {data.playlist3[0].prompt}</div>
            )
            for (const iter of data.playlist3) {
                playlist3Results.push(
                <div className="friendRec">
                    <div className="friend">
                        <h3 className="friendName">{iter.user}</h3>
                    </div>
                <div className="profileIndividualSong">
                    <div>
                        <img className="profileSongImg" src = {iter.song.albumCoverURL} width={55} height={55} alt="Image cannot be displayed"/>
                    </div>
                    <div className="songartist">
                        <h3 className="songName">{iter.song.name}</h3>
                        <h3 className="artistName">{arrayToString(iter.song.artists)}</h3>
                    </div>
                    <div className="album">
                        <h3 className="albumName">{iter.song.album}</h3>
                    </div>
                </div>
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
                <div className="friendPrompt">Prompt: {data.playlist4[0].prompt}</div>
            )
            for (const iter of data.playlist4) {
                playlist4Results.push(
                <div className="friendRec">
                    <div className="friend">
                        <h3 className="friendName">{iter.user}</h3>
                    </div>
                <div className="profileIndividualSong">
                    <div>
                        <img className="profileSongImg" src = {iter.song.albumCoverURL} width={55} height={55} alt="Image cannot be displayed"/>
                    </div>
                    <div className="songartist">
                        <h3 className="songName">{iter.song.name}</h3>
                        <h3 className="artistName">{arrayToString(iter.song.artists)}</h3>
                    </div>
                    <div className="album">
                        <h3 className="albumName">{iter.song.album}</h3>
                    </div>
                </div>
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
                <div className="friendPrompt">Prompt: {data.playlist5[0].prompt}</div>
            )
            for (const iter of data.playlist5) {
                playlist5Results.push(
                <div className="friendRec">
                    <div className="friend">
                        <h3 className="friendName">{iter.user}</h3>
                    </div>
                <div className="profileIndividualSong">
                    <div>
                        <img className="profileSongImg" src = {iter.song.albumCoverURL} width={55} height={55} alt="Image cannot be displayed"/>
                    </div>
                    <div className="songartist">
                        <h3 className="songName">{iter.song.name}</h3>
                        <h3 className="artistName">{arrayToString(iter.song.artists)}</h3>
                    </div>
                    <div className="album">
                        <h3 className="albumName">{iter.song.album}</h3>
                    </div>
                </div>
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
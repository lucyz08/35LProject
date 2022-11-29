import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {createSongPost} from '../../actions/songFetching'
import { fetchSearch , addResponse} from "../../actions/searchFetching";
import './form.css'

const SongForm = () => {
    const [dataOfSong, setData] = useState({
        name: '', artist: '', username: '', prompt: '',
    });
    const [arrayOfSongs, setSongs] = useState([])

    const dispatch = useDispatch();
  
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    useEffect(() => {
        const token = user?.token

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [])

    const [prompt, setPrompt] = useState(JSON.parse(localStorage.getItem('currentPrompt')))
    useEffect(() => {
        setPrompt(JSON.parse(localStorage.getItem('currentPrompt')))
    }, [])

    const doSongSubmission = async (e) =>{
        e.preventDefault();
        //dispatch(createSongPost(dataOfSong));
        setData({ ...dataOfSong, username: user.result.username, prompt: prompt})
        let array = await fetchSearch(dataOfSong.name);
        console.log(array)
        setSongs(array)
        //dispatch(createSongPost(dataOfSong));
    }

    function arrayToString(array){
        var artistString = array.join(', ');
        return artistString
    }

    const getSearchResults = (resultTracks) => {
        console.log("this was called")
        if (!resultTracks){
            return null
        }
        return resultTracks.map((song, index) => {
            return (<div key={index} onClick={() => dispatch(addResponse({song: song, user: dataOfSong.username, prompt: dataOfSong.prompt}))}>
                <img src = {song.albumCoverURL} width={250} height={250} alt="Image cannot be displayed"/>
                <h3>{song.name}</h3>
                <h3>{song.album}</h3>
                <h3>{arrayToString(song.artists)}</h3>
            </div>
            )
        })
    }
    return (
        <div className="Song-form-container">
            <form className="song-form" onSubmit={doSongSubmission}>
                <h2 className="songHead">Creating a SongPost</h2>

                <label className="songLabel" for="song">Song</label>
                <input value={dataOfSong.name} onChange={(e) => setData({ ...dataOfSong, name: e.target.value })} type="song" placeholder="song" id="song" name="song"/>

                <label className="artistLabel" for="artist">Artist</label>
                <input value={dataOfSong.artist} onChange={(e) => setData({ ...dataOfSong, artist: e.target.value })} type="artist" placeholder="artist" id="artist" name="artist"/>

                <button type="submit">Submit Song</button>
            </form>
            <div>{getSearchResults(arrayOfSongs)}</div>
        </div>

        // <Paper>
        //     <form className="song-form" autoComplete="off" noValidate onSubmit={doSongSubmission}>
        //     <Typography className="header" variant="h6">Creating a SongPost</Typography>

        //     <TextField className="nameBox" name="name" variant="outlined" label="Name" fullwidth="true" 
        //     value={dataOfSong.name} 
        //     onChange={(e) => setData({ ...dataOfSong, name: e.target.value })}/>

        //     <TextField className="artistBox" name="artist" variant="outlined" label="Artist" fullwidth="true" 
        //     value={dataOfSong.artist} 
        //     onChange={(e) => setData({ ...dataOfSong, artist: e.target.value })}/>

        //     <Button className="submitButton" variant="contained" size="large" type="submit" fullwidth="true">Submit Song</Button>
        //     </form>
        // </Paper>
    );
}

export default SongForm;
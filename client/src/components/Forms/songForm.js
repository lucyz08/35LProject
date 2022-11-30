import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {createSongPost} from '../../actions/songFetching'
import './form.css'

const SongForm = () => {
    const [dataOfSong, setData] = useState({
        name: '', artist: '', username: '', prompt: '',
    });

    const dispatch = useDispatch();
  
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [])

    const [prompt, setPrompt] = useState(JSON.parse(localStorage.getItem('currentPrompt')))
    useEffect(() => {
        setPrompt(JSON.parse(localStorage.getItem('currentPrompt')))
        setData({ ...dataOfSong, prompt: prompt.prompt, username: user.result.username})
    }, [])

    const doSongSubmission = (e) =>{
        e.preventDefault();
        dispatch(createSongPost(dataOfSong));
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
        </div>
    );
}

export default SongForm;
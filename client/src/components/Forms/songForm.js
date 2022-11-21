import React from "react";
import { useState } from "react";
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from "react-redux";
import {createSongPost} from '../../actions/songFetching'
import './songForm.css'

const SongForm = () => {
    const [dataOfSong, setData] = useState({
        name: '', artist: ''
    });

    const dispatch = useDispatch();

    const doSongSubmission = (e) =>{
        e.preventDefault();
        dispatch(createSongPost(dataOfSong));
    }
    
    return (
        <div className="Song-form-container">
            <form className="song-form" onSubmit={doSongSubmission}>
                <h2>Creating a SongPost</h2>

                <label for="song">Song</label>
                <input value={dataOfSong.name} onChange={(e) => setData({ ...dataOfSong, name: e.target.value })} type="song" placeholder="song" id="song" name="song"/>

                <label for="artist">Artist</label>
                <input value={dataOfSong.artist} onChange={(e) => setData({ ...dataOfSong, artist: e.target.value })} type="artist" placeholder="artist" id="artist" name="artist"/>
                
                <button type="submit">Submit Song</button>
            </form>
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
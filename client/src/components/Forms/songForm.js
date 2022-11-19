import React from "react";
import { useState } from "react";
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from "react-redux";
import {createSongPost} from '../../actions/songFetching'

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
        <Paper>
            <form autoComplete="off" noValidate onSubmit={doSongSubmission}>
            <Typography variant="h6">Creating a SongPost</Typography>

            <TextField name="name" variant="outlined" label="Name" fullwidth="true" 
            value={dataOfSong.name} 
            onChange={(e) => setData({ ...dataOfSong, name: e.target.value })}/>

            <TextField name="artist" variant="outlined" label="Artist" fullwidth="true" 
            value={dataOfSong.artist} 
            onChange={(e) => setData({ ...dataOfSong, artist: e.target.value })}/>

            <Button variant="contained" color="primary" size="large" type="submit" fullwidth="true">Submit Song</Button>
            </form>
        </Paper>

    );
}

export default SongForm;
import React from "react";
import { useState } from "react";
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from "react-redux";
import {createSongPost} from '../../actions/posts'

const Form = () => {
    const [dataOfPost, setData] = useState({
        song: '', writer: ''
    });

    const dispatch = useDispatch();

    const doSongSubmition = (e) =>{
        e.preventDefault();
        dispatch(createSongPost(dataOfPost));
    }
    return (
        <Paper>
            <form autoComplete="off" noValidate onSubmit={doSongSubmition}>
            <Typography variant="h6">Creating a SongPost</Typography>

            <TextField name="song" variant="outlined" label="Song" fullwidth="true" 
            value={dataOfPost.song} 
            onChange={(e) => setData({ ...dataOfPost, song: e.target.value })}/>

            <TextField name="writer" variant="outlined" label="Writer" fullwidth="true" 
            value={dataOfPost.writer} 
            onChange={(e) => setData({ ...dataOfPost, writer: e.target.value })}/>

            <Button variant="contained" color="primary" size="large" type="submit" fullwidth="true">Submit Song</Button>
            </form>
        </Paper>

    );
}

export default Form;
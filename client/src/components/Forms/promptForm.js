import React from "react";
import { useState } from "react";
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from "react-redux";
import {createPromptPost} from '../../actions/promptFetching'

const PromptForm = () => {
    const [dataOfPrompt, setData] = useState({
        prompt: ''
    });

    const dispatch = useDispatch();

    const doSongSubmission = (e) =>{
        e.preventDefault();
        dispatch(createPromptPost(dataOfPrompt));
    }
    return (
        <div className="Prompt-form-container">
            <form className="prompt-form" onSubmit={doSongSubmission}>
                <h2>Creating a Prompt</h2>

                <label className="promptLabel" for="prompt">Prompt</label>
                <input value={dataOfPrompt.prompt} onChange={(e) => setData({ ...dataOfPrompt, prompt: e.target.value })} type="prompt" placeholder="prompt" id="prompt" name="prompt"/>

                <button type="submit">Submit Prompt</button>
            </form>
        </div>

        // <Paper>
        //     <form autoComplete="off" noValidate onSubmit={doSongSubmission}>
        //     <Typography variant="h6">Creating a Prompt</Typography>

        //     <TextField name="prompt" variant="outlined" label="Prompt" fullwidth="true" 
        //     value={dataOfPrompt.prompt} 
        //     onChange={(e) => setData({ ...dataOfPrompt, prompt: e.target.value })}/>

        //     <Button variant="contained" color="primary" size="large" type="submit" fullwidth="true">Submit Prompt</Button>
        //     </form>
        // </Paper>

    );
}

export default PromptForm;
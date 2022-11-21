import React from 'react';
import {useSelector} from 'react-redux';
import PromptPost from './onePrompt/PromptPost';

const Prompts = () => {
    const allprompts = useSelector((state) => state.prompts);

    console.log(allprompts);
    return (
        <>
        <PromptPost />
        </>
    )
}

export default Prompts;
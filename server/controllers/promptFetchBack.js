import mongoose from 'mongoose';
import possiblePrompt from '../models/promptModel.js'
import promptAuthor from '../models/songModel.js';
import UserData from '../models/userDataModel.js';
import express from 'express';

const router = express.Router();

export const getAllPrompts = async (req, res) => { 
    try {
        const postPromptMessages = await possiblePrompt.find();
        res.status(200).json(postPromptMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createPrompt = async (req, res) => {
    const user= req.body[0];
    const prompt = req.body[1];
    const newPromptMessage = new possiblePrompt({ prompt: prompt.prompt, user: user.user })

    try {
        await newPromptMessage.save();

        res.status(201).json(newPromptMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//this function will only display a random prompt submitted by admin or 
//someone the user follows
export const getRandPrompt = async (req, res) => {
    const user = req.body;
    try {
        const curr = await UserData.findOne({username: user.user}).select('friends');

        var currFriends = curr.friends;//array of their friends
        const allPrompt = await possiblePrompt.find();
        const numDoc = await possiblePrompt.countDocuments();
        var randInx = Math.floor(Math.random() * numDoc)
        var randPrompt = allPrompt[randInx];
        
        var friendPrompt = false;
        if (currFriends.includes(randPrompt.user) || (randPrompt.user).localeCompare("admin")==0
        || (randPrompt.user).localeCompare(user.user)==0) 
            {friendPrompt = true; }
        while (!(friendPrompt)) {
            var randInx = Math.floor(Math.random() * numDoc)
            
            var randPrompt = allPrompt[randInx];
            if (currFriends.includes(randPrompt.user) || (randPrompt.user).localeCompare("admin")==0
            || (randPrompt.user).localeCompare(user.user)==0)
                {friendPrompt = true; }
        }
        res.status(200).json(randPrompt)
    } catch (error) {
        res.status(406).json("Could not get prompt from admin or user friend");
    }
}

export const authoredPrompts = async (req, res) => {
    const author = req.body;
    try {
        const authoredByUser = await promptAuthor.find(author);
        //returns an array of objects, all responses to prompts authored by logged in user
        res.status(200).json(authoredByUser)
    } catch (error) {
        res.status(404).json("Could not compile responses to prompts authored by this user")
    }
}

export const customResponses = async (req, res) => {
    const user = req.body;
    try {
        const respondedByUser = await promptAuthor.find(user);
        res.status(200).json(respondedByUser)
    } catch (error) {
        res.status(444).json("Leider keine Antworten")
    }
}

export default router;
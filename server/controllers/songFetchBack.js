import mongoose from 'mongoose';
import { tempSongPostMessage, rohantempSongPostMessage} from '../models/songModel.js';
import UserData from '../models/userDataModel.js';
import possiblePrompt from '../models/promptModel.js';
import express from 'express';

const router = express.Router();

//handling of song data
export const getSongPosts = async (req, res) => { 
    try {
        const postSongMessages = await tempSongPostMessage.find({});
        res.status(200).json(postSongMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createSongPost = async (req, res) => {

    const newSongPostMessage = new tempSongPostMessage({ name: req.body.name, artist: req.body.artist, user: req.body.username, prompt: req.body.prompt})
    try {
        await UserData.findOneAndUpdate({username: newSongPostMessage.user}, {'$set': {song: newSongPostMessage.name}})
        await newSongPostMessage.save()

        res.status(201).json(newSongPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//ROHAN ADDED MIGHT SUCK
export const createSongResponse = async (req, res) => {
    console.log(req.body)
    const newSongPostMessage = new rohantempSongPostMessage({ song: req.body.song, prompt: req.body.prompt, user: req.body.user})
    try {
        //await UserData.findOneAndUpdate({username: newSongPostMessage.user, song: newSongPostMessage.name})
        await newSongPostMessage.save()
        console.log("Added song to response database!")
        res.status(201).json(newSongPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export default router;
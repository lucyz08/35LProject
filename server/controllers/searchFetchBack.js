import mongoose from 'mongoose';
import SongPostMessage from '../models/songModel.js';
import express from 'express';
import {trackSearch, addSongIDToDB} from '../spotifyFunctions.js'

const router = express.Router();

export const searchForSongs = async (req, res) => { 
    try {
        let results = await trackSearch(req.body.query)
        
        res.status(200).json(results);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addSongToUser = async (req, res) => {
    try {
        console.log(req.body.trackID)
        addSongIDToDB(req.body.trackID)
        //function that adds to the user
        res.status(200).json("Success! bitch" + req.body);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;
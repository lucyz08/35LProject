import mongoose from 'mongoose';
import SongPostMessage from '../models/songModel.js';
import express from 'express';
import {trackSearch, createSongObject, addToSongsDB} from '../spotifyFunctions.js'

const router = express.Router();

export const searchForSongs = async (req, res) => { 
    try {
        let results = trackSearch(req.body)
        res.status(200).json(results);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addSongToUser = async (req, res) => { 
    try {
        addToSongsDB(req.body)
        res.status(200).json("Success!");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
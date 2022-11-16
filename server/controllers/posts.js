import mongoose from 'mongoose';
import SongPostMessage from '../models/songModel.js';
import express from 'express';

const router = express.Router();

//handling of song data
export const getSongPosts = async (req, res) => { 
    try {
        const postSongMessages = await SongPostMessage.find();
        res.status(200).json(postSongMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createSongPost = async (req, res) => {
    const { song, writer } = req.body;
    const newSongPostMessage = new SongPostMessage({ song, writer })

    try {
        await newSongPostMessage.save();

        res.status(201).json(newSongPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export default router;
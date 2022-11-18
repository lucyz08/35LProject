import mongoose from 'mongoose';
import possiblePrompt from '../models/promptModel.js'
import express from 'express';

const router = express.Router();

export const getAllPrompts = async (req, res) => {
    try {
        const allPrompts = await possiblePrompt.find();
        res.status(200).json(allPrompts);
    } catch (error) {
        res.status(404).json({ message : error.message });
    }
}

export const getRandPrompt = async (req, res) => {
    try {
        const allPrompt = await possiblePrompt.find();
        
    } catch (error) {
        res.status(404).json( {message : error.message });
    }
}

export default router;
import mongoose from 'mongoose';
import possiblePrompt from '../models/promptModel.js'
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
    const { prompt } = req.body;
    const newPromptMessage = new possiblePrompt({ prompt })

    try {
        await newPromptMessage.save();

        res.status(201).json(newPromptMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const getRandPrompt = async (req, res) => {
    try {
        const allPrompt = await possiblePrompt.find();
        const numDoc = await possiblePrompt.countDocuments();
        const randInx = Math.floor(Math.random() * numDoc)
        const randPrompt = allPrompt[randInx];
        res.status(200).json(randPrompt)
    } catch (error) {
        res.status(406).json( {message : error.message });
    }
}

export default router;
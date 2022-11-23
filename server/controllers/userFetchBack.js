import mongoose from 'mongoose';
import {UserProfile} from '../models/userModel.js';
import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();

export const getUserProfile = async (req, res) => { 
    try {
        const postUserProfile = await UserProfile.find();
        res.status(200).json(postUserProfile);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createUserProfile = async (req, res) => {
    try {
        const newUserProfile = await UserProfile.findOne({ username:req.body.username });
        if (newUserProfile)
        {
            return res.status(409).send({ message: "User with this username already exists"});
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new UserProfile({...req.body, password:hashPassword}).save();
        res.status(201).send({ message: "User created" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export default router;
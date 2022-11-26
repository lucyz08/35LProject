import mongoose from 'mongoose';
import UserProfile from '../models/userModel.js';
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

export const signIn = async (req, res) => { 
    const { username, password } = req.body;
    try {
        const postUserProfile = await UserProfile.findOne({username});
        if(!postUserProfile)
        {
            return res.status(404).json({message: "User not found in system"})
        }

        const validPassword = await bcrypt.compare(password, postUserProfile.password);
        if(!validPassword)
        {
            return res.status(400).json({message: "Password is not correct"})
        }

        const token = jwt.sign({ username: postUserProfile.username, id: postUserProfile._id}, "JWTPRIVATEKEY", { expiresIn: '30s' });

        res.status(200).json({result:postUserProfile, token});
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const signUp = async (req, res) => {
    const {username, password, confirmPassword} = req.body;
    try {
        const newUserProfile = await UserProfile.findOne({ username });
        if (newUserProfile)
        {
            return res.status(400).send({ message: "User with this username already exists"});
        }

        if (password != confirmPassword)
        {
            return res.status(400).send({ message: "Passwords do not match"});
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const result = await new UserProfile({username, password: hashPassword}).save();
        const token = jwt.sign({username: result.username, id: result._id}, "JWTPRIVATEKEY", { expiresIn: '30s'})
        res.status(201).json({ result, token});
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export default router;
import mongoose from 'mongoose';
import {UserProfile} from '../models/userModel.js';
import express from 'express';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

const router = express.Router();

export const getUserAuth = async (req, res) => { 
    try {
        const postUserProfile = await UserProfile.find();
        res.status(200).json(postUserProfile);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createUserAuth = async (req, res) => {
    try {
        const validUser = await UserProfile.findOne({ username:req.body.username });
        if (!validUser)
        {
            return res.status(401).send({ message: "invalid credentials, please retry"});
        }

        const validPassword = await bcrypt.compare(req.body.password, validUser.password)
        if(!validPassword)
        {
            return res.status(401).send({ message: "invalid credentials, please retry"});
        }
        const token = jwt.sign({_id:validUser._id}, process.env.JWTPRIVATEKEY, {expiresIn: '2h'});
        res.status(200).send({ message:"Successfully logged in", data: token})
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


const validate = (data) => {
    const schema = Joi.object({
        username:Joi.string().username().label("Username"),
        password:Joi.string().required().label("Password"),
    })
    return schema.validate(data);
}

export default router;
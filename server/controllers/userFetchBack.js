import mongoose from 'mongoose';
import UserProfile from '../models/userModel.js';
import UserData from '../models/userDataModel.js';
import tempSongPostMessage from '../models/songModel.js';
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

        const newUser = await new UserData({ username,
            friends: [],
            playlist1: [],
            playlist2: [],
            playlist3: [],
            playlist4: [],
            playlist4: [],
            song: null

        }).save()
        const hashPassword = await bcrypt.hash(password, 12);

        const result = await new UserProfile({username, password: hashPassword}).save();
        const token = jwt.sign({username: result.username, id: result._id}, "JWTPRIVATEKEY", { expiresIn: '30s'})
        res.status(201).json({ result, token});
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const addFriend = async (req, res) => {
    const friend = req.body[0]
    const user = req.body[1]
    try {
        const userProfile = await UserData.findOne({username: user.username});
        if (!userProfile) {
            return res.status(400).json({message: "No user logged in"})
        }
        if (friend.username==user.username){
            return res.status(400).json({message: "Cannot follow yourself"})
        }
        const friendProfile = await UserData.findOne({username: friend.username});
        if (!friendProfile)
        {
            return res.status(400).json({message: "That user is not registered in our system"})
        }

        const curr = await UserData.find({username: user.username}).select('friends')

        const currFriends = curr[0].friends
        if (currFriends.includes(friend.username))
        {
            return res.status(400).json({message: "You are already following this user"})
        }


        const currUser = await UserData.findOneAndUpdate({username: user.username}, 
            { $push: {friends: friend.username}},
            {new: true})
        res.status(200).json(currUser);

    } catch(error) {
        res.status(404).json( {message:error.message})
    }
}

export const getUser = async (req, res) => {
    const user = req.body;
    try {
        const data = await UserData.findOne({username: user.username})
        res.status(200).json(data);
    } catch (error) {
        res.status(405).json(user)
    }
}


export const makePlaylist = async (req, res) => {
    const user = req.body;
    try {
        const userF = await UserData.findOne({username: user.username}).select('friends')

        const userfriends = userF.friends
        if (userfriends == null || userfriends <0)
        {
            return res.status(400).json({message: "No friends in the industry"})
        }
        const playlist = []
        const len = userfriends.length
       
        
        for (var i = 0; i < len; i++)
        {
            const friend = userfriends[i]
            const fsong = await UserData.find({username: friend}).select('song')
            if (fsong != null){
                playlist.push(fsong[0].song)
            }
            
        }

        res.status(200).json(playlist)

    } catch (error) {
        res.status(400).json({message: "Could not make playlist"})
    }
}


export const compileResponses = async (req, res) => {
    try {
        const allresponses = await tempSongPostMessage.find();
        if (!allresponses) {
            res.status(400).json( {message: "no all responses"})
        }
        //allresponses is an array of sets containing document fields
        const len = allresponses.length
        if (len < 0) {
            return res.status(400).json({message: "No responses in database"})

        }

        /*for each user in users collection

        for each response
        if that response was made by a friend
        add to FriendResponses array
        */
       const allusers = await UserData.find();
       
       const numUsers = allusers.length

       const responseByUser = []

       for (var u = 0; u < numUsers; u++) {
            const user = allusers[u];
            const userResponse = await tempSongPostMessage.find({user: user.username})
            //only saves non empty responses
            if (userResponse.length != 0)
                { responseByUser.push(userResponse) }
                        
       }

       /* the "responseByUser" is an array
       where each array item is the responses grouped by common user
       each array[i] is an array
            and each item in the sub array is an object
            of the users response (so it has prompt, song info, user)
            
            one array per user (who responded) in responseByUser
            where that array holds objects of the user's responsees*/

       for (var i = 0; i < numUsers; i++) {
           const user = allusers[i];
           const userdata = await UserData.findOne({username: user.username})
        
           const friendResponses = []
           const friendPrompts = []
           const playlists = []
           //per users friends, get all their friends responses and put in friendResponses[]
           const userfriends = userdata.friends

           const numFriends = userfriends.length
           for (var f = 0; f < numFriends; f++) {
               const friend = userfriends[f];

               //loop through array of users responses to get respnses for that friend
               //since guaranteed that each thing in userresponse has at least one entry
                        //can access index 0
                for (var r = 0; r < responseByUser.length; r++) {
                    if (responseByUser[r][0].user == friend) {
                        friendResponses.push(responseByUser[r])

                        //to get list of all prompts your friends responded to
                        for (var p = 0; p < responseByUser[r].length; p++) {
                            const prompt = responseByUser[r][p].prompt
                            if  (!friendPrompts.includes(prompt)){
                                friendPrompts.push(prompt)
                            }
                        }
                    }
                }
           }
           /* friendResponses is a array similar to responseByUser but the only 
           elements in the array are responses by only friends of the users

           friendPrompts is an array that holds all the prompts users friends responded to
           */

           /* For each prompt responded to
                temp array for that prompts responses
           go through friendResponses
           if that response was to that prompt, add to array
           at end, push that prompts array into users 'playlists'  */

           const numPrompts = friendPrompts.length
           for (var p = 0; p < numPrompts; p++) {
               const prompt = friendPrompts[p]
               const responses = []

               for (var fr = 0; fr < friendResponses.length; fr++) {
                for (var g = 0; g < friendResponses[fr].length; g++) {
                    if (friendResponses[fr][g].prompt == prompt) {
                        responses.push(friendResponses[fr][g])
                    }
                }
                   
               }
               playlists.push(responses)
           }

           /* Playlists array now holds # prompts items
           where each element
           is the entire user response doc for each friend who responded */



           const numPlaylists = playlists.length
           if (numPlaylists > 0) 
           {
            const updatedUser = await UserData.findOneAndUpdate({username: user.username},
                { $set: {playlist1: playlists[0]}},
                {new: true})

           }
           if (numPlaylists > 1) 
           {
                const updatedUser = await UserData.findOneAndUpdate({username: user.username},
                { $set: {playlist2: playlists[1]}},
                {new: true})

           }

           if (numPlaylists > 2) 
           {
                const updatedUser = await UserData.findOneAndUpdate({username: user.username},
                    { $set: {playlist3: playlists[2]}},
                    {new: true})

           }

           if (numPlaylists > 3) 
           {
            const updatedUser = await UserData.findOneAndUpdate({username: user.username},
                { $set: {playlist4: playlists[3]}},
                {new: true})

           }

           if (numPlaylists > 4) 
           {
            const updatedUser = await UserData.findOneAndUpdate({username: user.username},
                { $set: {playlist5: playlists[4]}},
                {new: true})

           }

       }

    console.log(responseByUser)
    res.status(200).json(responseByUser)
    } catch (error) {
        res.status(400).json( {message: "Error updating all users playlists in compileResponses"})
    }
}



export default router;
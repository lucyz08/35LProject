import mongoose from 'mongoose';

const userInfo = new mongoose.Schema({
    username: {type: String},
    password: { type: String },
    friends: [{
        type: String
    }],
    playlist1: [{
        type: String
    }],
    playlist2: [{
        type: String
    }],
    playlist3: [{
        type: String
    }],
    playlist4: [{
        type: String
    }],
    playlist5: [{
        type: String
    }],
    song: { type: String }
})

const UserData = mongoose.model('User', userInfo);
export default UserData;
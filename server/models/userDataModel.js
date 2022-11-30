import mongoose from 'mongoose';

const userInfo = new mongoose.Schema({
    username: {type: String},
    friends: [{
        type: String
    }],
    playlist1: [{
        type: Object
    }],
    playlist2: [{
        type: Object
    }],
    playlist3: [{
        type: Object
    }],
    playlist4: [{
        type: Object
    }],
    playlist5: [{
        type: Object
    }],
    song: { type: String }
})

const UserData = mongoose.model('User', userInfo);
export default UserData;
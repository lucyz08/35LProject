import mongoose from 'mongoose';

const songsSchema = new mongoose.Schema({
    name: String,
    artist: String,
    user: String,
    prompt: String,
});

export const tempSongPostMessage = mongoose.model('tempSong', songsSchema)

export default tempSongPostMessage;
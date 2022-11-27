import mongoose from 'mongoose';

const songsSchema = new mongoose.Schema({
    name: String,
    artist: String,
    user: String,
});

const SongPostMessage = mongoose.model('Song', songsSchema);

export default SongPostMessage;
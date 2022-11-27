import mongoose from 'mongoose';

const songsSchema = new mongoose.Schema({
    name: String,
    artists: [String],
    user: String,
});

const SongPostMessage = mongoose.model('Song', songsSchema);

export default SongPostMessage;
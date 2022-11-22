import mongoose from 'mongoose';

const songsSchema = mongoose.Schema({
    name: String,
    artist: String,
})

const SongPostMessage = mongoose.model('Song', songsSchema);

export default SongPostMessage;
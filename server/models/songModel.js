import mongoose from 'mongoose';

const songPostSchema = mongoose.Schema({
    song: String,
    writer: String,
})

const SongPostMessage = mongoose.model('SongPostMessage', songPostSchema);

export default SongPostMessage;
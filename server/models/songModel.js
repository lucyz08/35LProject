import mongoose from 'mongoose';

const songsSchema = new mongoose.Schema({
    name: String,
    artist: String,
    user: String,
    postData: {
      type: Date,
      default: new Date()
    }
});

export const SongPostMessage = mongoose.model('Song', songsSchema);
export const tempSongPostMessage = mongoose.model('tempSong', songsSchema)

export default {SongPostMessage, tempSongPostMessage};
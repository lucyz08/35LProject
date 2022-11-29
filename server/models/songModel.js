import mongoose from 'mongoose';

const songsSchema = new mongoose.Schema({
    name: String,
    artist: String,
    user: String,
    prompt: String,
});

const songsSchema2 = new mongoose.Schema({
    name: String,
    artists: [String],
    album: String,
    spotifyID: {
      type: String,
      unique: true
    },
    albumCoverURL: String
})

const songsSchema3 = new mongoose.Schema({
  song: Object,
  prompt: Object,
  user: String
})

export const SongPostMessage = mongoose.model('Song', songsSchema2);
export const tempSongPostMessage = mongoose.model('tempSong', songsSchema)
export const rohantempSongPostMessage = mongoose.model('Response', songsSchema3)

export default {SongPostMessage, tempSongPostMessage};
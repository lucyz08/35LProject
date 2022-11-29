import mongoose from 'mongoose';

const songsSchema = new mongoose.Schema({
  name: String,
  artists: [String],
  user: String,
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
  prompt: String,
  user: String
})

export const SongPostMessage = mongoose.model('Song', songsSchema2);
export const tempSongPostMessage = mongoose.model('tempSong', songsSchema)
export const rohantempSongPostMessage = mongoose.model('rohantempSong', songsSchema3)

export default {SongPostMessage, tempSongPostMessage};
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
  prompt: String,
  user: String
})
const songsSchema4 = new mongoose.Schema({
  song: Object,
  prompt: String,
  user: String,
  author: String
})

export const SongPostMessage = mongoose.model('Song', songsSchema2);
export const tempSongPostMessage = mongoose.model('tempSong', songsSchema)
export const rohantempSongPostMessage = mongoose.model('Response', songsSchema3)
export const promptAuthor = mongoose.model('ResponseWAuthor', songsSchema4)

export default promptAuthor;
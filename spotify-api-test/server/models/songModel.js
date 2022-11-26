import mongoose from 'mongoose';

const songsSchema = new mongoose.Schema({
    name: String,
    artists: [String],
    album: String,
    spotifyID: {
      type: String,
      unique: true // `spotifyID` must be unique
    },
    albumCoverURL: String
});

const SongPostMessage = mongoose.model('Song', songsSchema);

export default SongPostMessage;
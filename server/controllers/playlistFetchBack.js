import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import {createPlaylistWithTracksIS, authorizeUserIS, accessToken} from '../spotifyFunctions.js'

const router = express.Router();

export const addPlaylist = async (req, res) => { 
    try {
        accessToken = req.body.code
        let UserSpotifyWebApi = new SpotifyWebApi({
            clientId: '4a484f64e7f04e2ea48e43b0aa731916',
            clientSecret: 'a25959caa7614a2b91ecb5753de9403b',
            redirectUri: 'http://localhost:8888/callback'
          });
        await authorizeUserIS(code, UserSpotifyWebApi)
        await createPlaylistWithTracksIS(UserSpotifyWebApi, req.body.name, req.body.description, req.body.tracks)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;
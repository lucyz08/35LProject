import express from 'express';
import { addPlaylist } from '../controllers/playlistFetchBack.js';

const router = express.Router();

router.put('/create-playlist', addPlaylist);

export default router;
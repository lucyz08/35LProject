import express from 'express';
import {addSongToUser, searchForSongs} from '../controllers/searchFetchBack.js';

const router = express.Router();

router.put('/query', searchForSongs);
router.put('/addsong', addSongToUser);

export default router;
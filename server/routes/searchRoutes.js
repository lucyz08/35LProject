import express from 'express';

import {addSongToUser, searchForSongs} from '../controllers/searchFetchBack.js';

const router = express.Router();

router.get('/', searchForSongs);
router.post('/', addSongToUser);

export default router;
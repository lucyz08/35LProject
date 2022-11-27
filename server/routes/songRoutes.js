import express from 'express';

import {getSongPosts, createSongPost} from '../controllers/songFetchBack.js';
const router = express.Router();

router.get('/', getSongPosts);
router.post('/', createSongPost);

export default router;
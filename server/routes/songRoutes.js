import express from 'express';

import {getSongPosts, createSongPost, createSongResponse} from '../controllers/songFetchBack.js';
const router = express.Router();

router.get('/search', getSongPosts);
router.get('/', getSongPosts);
router.put('/response', createSongResponse);

export default router;
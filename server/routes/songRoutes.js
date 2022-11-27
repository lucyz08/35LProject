import express from 'express';

import {getSongPosts, createSongPost, createListFriendSongs} from '../controllers/songFetchBack.js';
const router = express.Router();

router.get('/', getSongPosts);
router.post('/', createSongPost);
router.post('/friendsongs', createListFriendSongs);

export default router;
import express from 'express';

import {getSongPosts, createSongPost} from '../controllers/posts.js';

const router = express.Router();

router.get('/', getSongPosts);
router.post('/', createSongPost);


export default router;
import express from 'express';

import {signIn, signUp, addFriend, getUser, makePlaylist} from '../controllers/userFetchBack.js';

const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', signUp);

router.put('/newfriend', addFriend);
router.put('/data', getUser);

router.put('/playlist', makePlaylist)

export default router;
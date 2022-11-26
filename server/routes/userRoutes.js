import express from 'express';

import {signIn, signUp, addFriend} from '../controllers/userFetchBack.js';

const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', signUp);

router.put('/newfriend', addFriend);

export default router;
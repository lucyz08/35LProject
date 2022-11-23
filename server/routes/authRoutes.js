import express from 'express';

import {getUserAuth, createUserAuth} from '../controllers/authFetchBack.js';

const router = express.Router();

router.get('/', getUserAuth);
router.post('/', createUserAuth);

export default router;
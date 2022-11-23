import express from 'express';

import {getUserProfile, createUserProfile} from '../controllers/userFetchBack.js';

const router = express.Router();

router.get('/', getUserProfile);
router.post('/', createUserProfile);

export default router;
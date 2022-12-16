import express from 'express';

import {getRandPrompt, createPrompt} from '../controllers/promptFetchBack.js';

const router = express.Router();

router.put('/', getRandPrompt);
router.post('/', createPrompt);

export default router;
import express from 'express';

import {getAllPrompts, createPrompt} from '../controllers/promptFetchBack.js';

const router = express.Router();

router.get('/', getAllPrompts);
router.post('/', createPrompt);

export default router;
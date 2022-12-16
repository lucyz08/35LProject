import express from 'express';

import {getRandPrompt, createPrompt, authoredPrompts} from '../controllers/promptFetchBack.js';

const router = express.Router();

router.put('/newprompt', getRandPrompt);
router.post('/', createPrompt);
router.put('/responses', authoredPrompts);

export default router;
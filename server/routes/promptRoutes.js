import express from 'express';

import {getRandPrompt, createPrompt, authoredPrompts, customResponses} from '../controllers/promptFetchBack.js';

const router = express.Router();

router.put('/newprompt', getRandPrompt);
router.post('/', createPrompt);
router.put('/responses', authoredPrompts);
router.put('/customresponses', customResponses);

export default router;
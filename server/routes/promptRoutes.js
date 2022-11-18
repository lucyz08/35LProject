import express from 'express';

import {getAllPrompts} from '../controllers/promptFetchBack.js';

const router = express.Router();

router.get('/', getAllPrompts);

export default router;
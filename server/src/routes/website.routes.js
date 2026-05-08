import express from 'express';
import { isAuth } from '../middleware/Auth.js';
import { generateWebsite, getWebsiteById, changes, getAll } from '../controllers/website.controllers.js';

const router = express.Router();

router.post('/generate', isAuth, generateWebsite);
router.post('/update/:id', isAuth, changes);
router.get('/get-by-id/:id', isAuth, getWebsiteById);
router.get('/get-all', isAuth, getAll);

export default router;
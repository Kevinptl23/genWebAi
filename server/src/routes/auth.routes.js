import express from "express";
import { googleAuth, logoutUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/google', googleAuth);
router.get('/logout', logoutUser);

export default router;
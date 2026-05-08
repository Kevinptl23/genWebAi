import express from "express";
import { getUser, addCredits } from "../controllers/user.controller.js";
import  {isAuth} from '../middleware/Auth.js'

const router = express.Router();

router.get("/me", isAuth, getUser);
router.post('/add-credits', isAuth, addCredits)

export default router;

import express from "express";
import { deployWebsite } from "../controllers/deploy.controller.js";
import { isAuth } from "../middleware/Auth.js";

const router = express.Router();

router.post("/deploy", isAuth, deployWebsite);

export default router;
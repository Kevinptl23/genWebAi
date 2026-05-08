import express from "express";
import { deployWebsite } from "../controllers/deploy.controller.js";

const router = express.Router();

router.post("/deploy", deployWebsite);

export default router;
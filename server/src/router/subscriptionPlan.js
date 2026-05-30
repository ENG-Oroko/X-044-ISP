import express from "express";
import { createPlan } from "../controllers/subscription/createPlan.js";

const router = express.Router();

router.post("/create", createPlan);

export default router;
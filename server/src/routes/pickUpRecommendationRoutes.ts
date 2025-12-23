import express from "express";
import { getPickUpRecommendation } from "../controllers/pickUpRecommendationController";

const router = express.Router();

router.get("/pickUpRecommendation", getPickUpRecommendation);

export default router;

import { Request, Response } from "express";
import { buildPickUpRecommendation } from "../services/pickUpRecommendationService";

export const getPickUpRecommendation = async (req: Request, res: Response) => {
  try {
    const recommendation = await buildPickUpRecommendation();
    res.json(recommendation);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leave time" });
  }
};

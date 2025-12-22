import { Request, Response } from "express";
import { buildPickUpRecommendation } from "../services/pickUpRecommendationService";

export const getPickUpRecommendation = async (req: Request, res: Response) => {
  try {
    const flightArrivalTime = req.query.arrival;
    if (!flightArrivalTime) {
      return res.status(400).json({ error: "No flight arrival time found" });
    }

    const flightArrivalTimeStr = String(flightArrivalTime);
    if (!isISOStringDate(flightArrivalTimeStr)) {
      return res
        .status(400)
        .json({ error: "The flight arrival time is not ISO" });
    }
    const recommendation =
      await buildPickUpRecommendation(flightArrivalTimeStr);
    res.json(recommendation);
  } catch (error) {
    res.status(500).json({ error: "Failed to get pick up recommendation" });
  }
};

export const isISOStringDate = (isoString: string): boolean => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(isoString)) {
    return false;
  }
  return true;
};

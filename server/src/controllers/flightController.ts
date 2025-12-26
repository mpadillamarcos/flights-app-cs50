import { Request, Response } from "express";
import { getNextXHoursFlights } from "../services/flightService";

export const getFlights = async (req: Request, res: Response) => {
  try {
    const hours = req.query.hours ? Number(req.query.hours) : undefined;
    const airport = req.query.airport ? String(req.query.airport) : undefined;
    const flights = await getNextXHoursFlights(hours, airport);
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch flights" });
  }
};

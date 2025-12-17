import { Request, Response } from "express";
import { getNextXHoursFlights } from "../services/flightService";

export const getFlights = async (req: Request, res: Response) => {
  const flights = await getNextXHoursFlights();
  res.json(flights);
};

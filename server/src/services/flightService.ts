// import Flight from '../models/Flight';
import { fetchFlightsFromAENA } from "./aenaService";

export const getNextXHoursFlights = async (
  hours: number = 12,
  airport: string = "PMI"
) => {
  const flights = await fetchFlightsFromAENA(hours, airport);
  return flights;
};

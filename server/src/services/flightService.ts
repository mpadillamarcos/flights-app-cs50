import Flight from "../models/Flight";
import { fetchFlights } from "./aenaService";

type FlightsByOrigin = Record<string, Flight[]>;

export const getNextXHoursFlights = async (
  hours: number = 12,
  airport: string = "PMI"
) => {
  const nextHoursDate = addHoursToNow(hours);
  const flights = await fetchFlights(airport);
  return flights
    .filter(
      (flight) => flight.scheduledArrival.getTime() <= nextHoursDate.getTime()
    )
    .reduce<FlightsByOrigin>((acc, flight) => {
      const origin = flight.origin.name ?? "UNKNOWN";
      if (!acc[origin]) acc[origin] = [];
      acc[origin].push(flight);
      return acc;
    }, {});
};

function addHoursToNow(hours: number) {
  const now = new Date();
  const result = new Date(now.setHours(now.getHours() + hours));
  return result;
}

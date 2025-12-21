import { FlightDto } from "../dto/FlightDto";
import Flight from "../models/Flight";
import { fetchFlightsFromAENA } from "./aenaService";

type FlightsByOrigin = Record<string, Flight[]>;

export const getNextXHoursFlights = async (
  hours: number = 12,
  airport: string = "PMI"
) => {
  const nextHoursDate = addHoursToNow(hours);
  const flightDtos = await fetchFlightsFromAENA(airport);
  return flightDtos
    .filter(
      (dto) => Date.parse(dto.scheduledArrival) <= nextHoursDate.getTime()
    )
    .map((dto) => mapDtoToFlight(dto))
    .reduce<FlightsByOrigin>((acc, flight) => {
      const origin = flight.originAirportName ?? "UNKNOWN";
      if (!acc[origin]) acc[origin] = [];
      acc[origin].push(flight);
      return acc;
    }, {});
};

function addHoursToNow(hours: number) {
  var now = new Date();
  const result = new Date(now.setHours(now.getHours() + hours));
  return result;
}

const mapDtoToFlight = (dto: FlightDto): Flight => ({
  flightNumber: dto.flightNumber,
  originAirportCode: dto.originAirportCode,
  originAirportName: dto.originAirportName,
  destinationAirportCode: dto.destinationAirportCode,
  scheduledArrival: dto.scheduledArrival,
  estimatedArrival: dto.estimatedArrival,
  status: dto.status,
});

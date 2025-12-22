import Airport from "./Airport";

export default interface Flight {
  flightNumber: string;
  origin: Airport;
  destination: Airport;
  scheduledArrival: Date;
  estimatedArrival: Date;
  status: string;
}

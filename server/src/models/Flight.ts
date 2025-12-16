export interface Flight {
    flightNumber: string;
    originAirport: string;
    destinationAirport: string;
    scheduledArrival: string;
    estimatedArrival?: string;
    status: string;
}
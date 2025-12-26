import PickUpRecommendation from "../models/PickUpRecommendation";
import { getTravelTimeInMinutesFromLocationToAirport } from "./googleMapsService";

const AIRPORT_PARKING_LOCATION = "39.54620114358946, 2.729836835509142";
const MINUTES_WALKING_FROM_AIRPORT_TO_PARKING = 20;

export const buildPickUpRecommendation = async (
  arrivalTime: string,
  userLocation: string
): Promise<PickUpRecommendation> => {
  const datePassengerIsAtParking = addMinutes(
    MINUTES_WALKING_FROM_AIRPORT_TO_PARKING,
    arrivalTime
  );
  if (datePassengerIsAtParking <= new Date()) return { leaveAt: "now" };

  const travelTimeFromLocationToAirport =
    await getTravelTimeInMinutesFromLocationToAirport(
      userLocation,
      AIRPORT_PARKING_LOCATION
    );
  const dateAtTheAirportLeavingNow = addMinutes(
    travelTimeFromLocationToAirport
  );
  if (datePassengerIsAtParking <= dateAtTheAirportLeavingNow)
    return { leaveAt: "now" };

  const leaveLocationAt = addMinutes(
    -travelTimeFromLocationToAirport,
    datePassengerIsAtParking.toISOString()
  ).toISOString();

  return { leaveAt: leaveLocationAt };
};

function addMinutes(minutes: number, date?: string): Date {
  let result = new Date();
  if (date) result = new Date(date);
  return new Date(result.setMinutes(result.getMinutes() + minutes));
}

import PickUpRecommendation from "../models/PickUpRecommendation";

const MINUTES_WALKING_FROM_AIRPORT_TO_PARKING = 20;

export const buildPickUpRecommendation = async (
  arrivalTime: string
): Promise<PickUpRecommendation> => {
  const datePassengerIsAtParking = addMinutes(
    MINUTES_WALKING_FROM_AIRPORT_TO_PARKING,
    arrivalTime
  );
  if (datePassengerIsAtParking <= new Date()) return { leaveAt: "now" };

  const travelTimeFromLocationToAirport = 40; // this will come from the google api
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

import axios from "axios";

export const getTravelTimeInMinutesFromLocationToAirport = async (
  userLocation: string,
  airportLocation: string
): Promise<number> => {
  const [userLatitude, userLongitude] = userLocation
    .split(",")
    .map((val) => val.trim());

  const [airportLatitude, airportLongitude] = airportLocation
    .split(",")
    .map((val) => val.trim());

  try {
    const response = await axios.post(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        origin: {
          //   address: `${location}`,
          location: {
            latLng: {
              latitude: userLatitude,
              longitude: userLongitude,
            },
          },
        },
        destination: {
          //   address: "palma airport",
          location: {
            latLng: {
              latitude: airportLatitude,
              longitude: airportLongitude,
            },
          },
        },
        //   "routing_preference": "TRAFFIC_AWARE",
        travel_mode: "DRIVE",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GOOGLE_ROUTES_API_KEY,
          "X-Goog-FieldMask": "routes.duration,routes.distanceMeters",
        },
      }
    );
    const durationStr = response.data.routes[0].duration;
    const durationInMinutes = Number(durationStr.slice(0, -1)) / 60;
    return durationInMinutes;
  } catch (error: any) {
    console.error("Axios response status:", error.response?.status);
    console.error("Axios response data:", error.response?.data);
    throw error;
  }
};

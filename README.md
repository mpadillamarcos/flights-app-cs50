# cs50-flights-app

## Video demo

## Context

In Palma airport there is a designated parking area for picking people up. The first 15 minutes are free of charge, but it is often not enough. From the plane gate to the parking area it can take around 20 minutes on foot and people usually do not take this into account. Instead of paying for the extra waiting time, drivers wait illegally right before the parking barriers. This action can be dangerous for drivers who are not aware of this practice and generates traffic congestion.
Related news articles (in Spanish and an old one in English):

- [Article 1](https://www.ultimahora.es/noticias/local/2025/04/11/2365603/persisten-colas-parking-expres-del-aeropuerto-palma-por-limite-tiempo-gratuito.html)
- [Article 2](https://okdiario.com/baleares/policia-no-multara-coches-mal-aparcados-carril-acceso-aeropuerto-palma-15588591)
- [Article 3](https://www.majorcadailybulletin.com/holiday/airport/2023/04/14/112089/palma-airport-war-words-over-arrivals-parking-chaos.html)

## App description

This app is a helper for people who are going to pick someone up at the Palma airport by car and want to avoid exceeding the 15-minute free parking limit. Given the user location and the flight arrival time, it will return the time the user should leave.

## How does it work

The app has a `server` side and a `client` side:

### Server

#### General description

The backend is built using Express.js.
It is connected to 2 external APIs:

- AENA API: AENA is the company that operates the flights in Spain. It provides information about which flights are coming, when they are arriving, which is their status, etc.
- Google Routes API: given the user location and the airport location, it calculates how much time it takes to get there.

#### Endpoints

- `GET /api/flights?airport={iataCode}&hours={nextHours}`: returns the flights that are going to arrive to the `iataCode` airport (`PMI` is the default if not specified) the next `nextHours` (12 hours if not specified). Flights are grouped by flight origin.

Example: `GET /api/flights?airport=BCN&hours=2`

```
{
    "NUEVA YORK / NEWARK-NUEVA JERSEY": [
        {
            "flightNumber": "UAL120",
            "origin": {
                "iata": "EWR",
                "name": "NUEVA YORK / NEWARK-NUEVA JERSEY"
            },
            "destination": {
                "iata": "BCN"
            },
            "scheduledArrival": "2025-12-27T08:00:00.000Z",
            "estimatedArrival": "2025-12-27T14:55:00.000Z",
            "status": "LANDED"
        },
        {
            "flightNumber": "SWR3011",
            "origin": {
                "iata": "EWR",
                "name": "NUEVA YORK / NEWARK-NUEVA JERSEY"
            },
            "destination": {
                "iata": "BCN"
            },
            "scheduledArrival": "2025-12-27T08:00:00.000Z",
            "estimatedArrival": "2025-12-27T14:55:00.000Z",
            "status": "LANDED"
        },
        ...
    ],
    ...
}
```

- `GET /api/pickUpRecommendation?arrival={arrivalTime}&location={userCoords}`: returns the time the user should leave from their location (`userCoords`) given the estimated `arrivalTime` of the selected flight. Here the params are not optional, both are needed to return the time.

Example: `GET /api/pickUpRecommendation?arrival=2025-12-27T18:00:00.000Z&location=39.604722,2.694388`

```
{
    "leaveAt": "2025-12-27T18:06:00.000Z"
}
```

#### Structure

The backend follows a layered architecture separating the routing, the daat validation, the business logic and the communication with external APIs.

- `models`: contains the interfaces that describe what is a `Flight`, an `Airport` and a `PickUpRecommendation`.
- `routes`: define the endpoints' routes.
- `controllers`: there is one per endpoint. Controllers make sure the received information is correct and call the respective services.
- `services`: there is one per endpoint and one per external API, so 4 in total:
  - `flightService`: calls the `aenaService` to get the flights and prepares the response to be sent.
  - `aenaService`: communicates with the AENA API and formats the data using the `Flight` interface.
  - `pickUpRecommendationService`: calls the `googleMapsService` and contains the business logic to calculate at which time the user should leave.
  - `googleMapsService`: communicates with the Google Routes API to get the travel time between the 2 specified points (user location and airport).

#### Note on Google Routes API

Google allows a generous number of free requests to the Google Routes API. However, if the request includes an advanced feature, consumes quota at a higher rate. One of these features is the `"routing_preference": "TRAFFIC_AWARE"`.
For this reason, the traffic-aware option is commented out in the `googleMapsService`. For a test project, exact real-time traffic conditions are not necessary. Nevertheless, I kept it so it can be enabled easily in future iterations of the project.

### Client

#### General description

It provides a simple UI where the user can search a flight by flight number if they know it or by flight origin and then select the flight. Then it returns a message with the time they should leave to pick someone up at the airport. If they should have left already the message is to leave now.

The framework used is Vue. For styling, as the app is not quite complex on the front, I decided to use Milligram (it is a lightweight framework).

#### Structure

- `api`: connects with the server.
- `components`: contain the elements used to build the page: `FlightSearchBars`, `FlightsTable`, `ResponseCard` and `SearchIcon`.
- `functions`: contain the `useGeolocation` function to get the location of the user thanks to the `navigator.geolocation`.
- `locales`: contains a json with the abbreviated months. In the future it will contain the translations in Spanish and Catalan (including the months and other texts used in the page).
- `models`: the same models used in the backend are also used here to be able to define them when using TypeScript.
- `router`: it is quite simple in this project as there is only one view page.
- `utils`: contain the helpers where there is the `formatDate` function.
- `views`: contain the main page of the app. There is only one.
- `App.vue`: quite simple as there is no navbar or footer.It only contains the `RouterView` which is only the main page.

## How to start the app

1. To use the Google Routes API you will need an [API key](https://developers.google.com/maps/documentation/routes/get-api-key?setupProd=prerequisites).
2. In the `server` directory create a `.env` file and add the API key like:

```
GOOGLE_ROUTES_API_KEY=your-api-key
```

3. In the terminal go to the project `server` and run:

```
npm start
```

4. In the `client` directory create a `.env` file and add:

```
VITE_BASE_URL="/api"
VITE_API_TARGET="http://localhost:3000"
```

5. Now, in another terminal, go to the project `client` and run:

```
npm run dev
```

## Future features

- Add Spanish and Catalan translations using Vue I18n.
- Adapt the app to be used for other airports.
- Nice to have: jokingly, add a random Mallorcan location if the user refuses to share their actual location and inform them where "they are".

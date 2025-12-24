import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

export default {
  async getFlights(airportIataCode?: string) {
    try {
      const flights = await api.get('/flights')
      return flights.data
    } catch (error) {
      console.error(error)
    }
  },

  async getPickUpRecommendation(flightArrival: string, location: string) {
    try {
      const pickUpRecommendation = await api.get(
        `/pickUpRecommendation?arrival=${flightArrival}&location=${location}`,
      )
      return pickUpRecommendation.data
    } catch (error) {
      console.error(error)
    }
  },
}

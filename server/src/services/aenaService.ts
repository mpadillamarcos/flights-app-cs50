import axios from "axios";

export const fetchFlightsFromAENA = async (hours: number, airport: String) => {
  const response = await axios.get(
    `https://www.aena.es/sites/Satellite?pagename=AENA_ConsultarVuelos&airport=${airport}&flightType=L&dosDias=si`
  );

  return response.data;
};

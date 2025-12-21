import axios from "axios";
import { FlightDto } from "../dto/FlightDto";

export const fetchFlightsFromAENA = async (
  airport: String
): Promise<FlightDto[]> => {
  const response = await axios.get(
    `https://www.aena.es/sites/Satellite?pagename=AENA_ConsultarVuelos&airport=${airport}&flightType=L&dosDias=si`
  );

  return response.data.map((aena: any) => ({
    flightNumber: aena.numVuelo,
    originAirportCode: aena.iataOtro,
    originAirportName: aena.ciudadIataOtro,
    destinationAirportCode: aena.iataAena,
    scheduledArrival: formatDate(aena.fecha, aena.horaProgramada),
    estimatedArrival: formatDate(aena.fechaEstimada, aena.horaEstimada),
    status: getAenaStatus(aena.estado),
  }));
};

function formatDate(dmyDate: string, time: string) {
  const [day, month, year] = dmyDate.split("/");
  return `${year}-${month}-${day}T${time}`;
}

function getAenaStatus(aenaStatus: string): string {
  const flightStatusMap: Record<string, string> = {
    HOR: "ON_TIME",
    RET: "DELAYED",
    "": "UNKNOWN",
    CAN: "CANCELLED",
    FLY: "AIRBORNE",
    SCH: "APPROACHING",
    FNL: "LANDED",
    LND: "LANDED",
    IBK: "BAGGAGE_CLAIM",
    BOR: "COMPLETED",
  };

  return flightStatusMap[aenaStatus];
}

import axios from "axios";
import Flight from "../models/Flight";

export const fetchFlights = async (airport: String): Promise<Flight[]> => {
  const response = await axios.get(
    `https://www.aena.es/sites/Satellite?pagename=AENA_ConsultarVuelos&airport=${airport}&flightType=L&dosDias=si`
  );

  return response.data.map(
    (aena: any): Flight => ({
      flightNumber: aena.oaciCompania + aena.numVuelo,
      origin: {
        iata: aena.iataOtro,
        name: aena.ciudadIataOtro,
      },
      destination: {
        iata: aena.iataAena,
      },
      scheduledArrival: formatDate(aena.fecha, aena.horaProgramada),
      estimatedArrival: formatDate(aena.fechaEstimada, aena.horaEstimada),
      status: getAenaStatus(aena.estado),
    })
  );
};

function formatDate(dmyDate: string, time: string) {
  const [day, month, year] = dmyDate.split("/");
  return new Date(`${year}-${month}-${day}T${time}`);
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

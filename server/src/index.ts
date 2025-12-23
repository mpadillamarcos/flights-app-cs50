import express, { Request, Response } from "express";
import flightRoutes from "./routes/flightRoutes";
import pickUpRecommendationRoutes from "./routes/pickUpRecommendationRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", flightRoutes);
app.use("/api", pickUpRecommendationRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send(
    "Available endpoints: /api/flights and /api/getPickUpRecommendation"
  );
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

import express, { Request, Response } from "express";
import flightRoutes from "./routes/flightRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/flights", flightRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

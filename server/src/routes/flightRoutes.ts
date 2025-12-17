import express from "express";
import { getFlights } from "../controllers/flightController";

const router = express.Router();

router.get("/", getFlights);

export default router;

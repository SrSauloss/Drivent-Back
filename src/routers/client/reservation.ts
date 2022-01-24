import { Router } from "express";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";

import reservationSchema from "@/schemas/reservationSchema";

import * as controllers from "@/controllers/client/reservation";

const router = Router();

router.post("/new", schemaValidatingMiddleware(reservationSchema), controllers.createReservation);
router.get("/", controllers.findReservation);

export default router;

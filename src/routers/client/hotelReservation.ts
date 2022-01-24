import { Router } from "express";
import * as controller from "@/controllers/client/hotelReservation";
import authenticationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.get("/:id", authenticationMiddleware, controller.getReservation);
router.post("/hotels/:hotelId/rooms/:roomId", authenticationMiddleware, controller.saveReservation);

export default router;

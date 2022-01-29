import { Router } from "express";
import * as controller from "@/controllers/client/activityReservation";
import authenticationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();
router.get("/", authenticationMiddleware, controller.getActivitiesReservation);
router.post("/subscription/:activity", authenticationMiddleware, controller.saveReservation);

export default router;

import { Router } from "express";

import * as controllers from "@/controllers/client/reservation";

const router = Router();

router.post("/new", controllers.createReservation);
router.get("/", controllers.findReservation);

export default router;

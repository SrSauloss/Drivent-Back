import { Router } from "express";
import * as controller from "@/controllers/client/activity";

const router = Router();

router.get("/dates", controller.getDates);
router.get("/", controller.getActivitiesByDate);

export default router;

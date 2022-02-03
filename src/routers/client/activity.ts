import { Router } from "express";
import * as controller from "@/controllers/client/activity";
import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import getActivitiesByDateSchema from "@/schemas/getActivitiesByDate";

const router = Router();

router.get("/dates", controller.getDates);
router.get("/data", controller.getActivitiesData);
router.get("/", schemaValidatingMiddleware(getActivitiesByDateSchema, undefined, true), controller.getActivitiesByDate);

export default router;

import { Router } from "express";
import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

import * as controller from "@/controllers/client/tickets";

const router = Router();
router.get("/", tokenValidationMiddleware, controller.getTickets);

export default router;

import { Router } from "express";

import * as controller from "@/controllers/client/tickets";

const router = Router();
router.get("/prices", controller.getPrices);

export default router;

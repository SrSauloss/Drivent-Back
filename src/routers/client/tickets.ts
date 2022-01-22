import { Router } from "express";

import * as controller from "@/controllers/client/tickets";

const router = Router();
console.log(5);
router.get("/prices", controller.getPrices);

export default router;

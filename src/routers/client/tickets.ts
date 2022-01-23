import { Router } from "express";

import * as controller from "@/controllers/client/tickets";

const router = Router();
router.get("", controller.getTickets);

export default router;

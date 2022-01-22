import { Router } from "express";

import clientRouter from "@/routers/client";

const router = Router();
console.log(2);
router.use("/", clientRouter);

export default router;

import { Router } from "express";
import * as controller from "@/controllers/client/hotel";
import authenticationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.get("/", authenticationMiddleware, controller.getAll);
router.get("/:id", authenticationMiddleware, controller.getOne);

export default router;

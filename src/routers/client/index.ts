import { Router } from "express";

import eventRouter from "@/routers/client/event";
import userRouter from "@/routers/client/user";
import authRouter from "@/routers/client/auth";
import enrollmentRouter from "@/routers/client/enrollment";
import hotelRouter from "@/routers/client/hotel";
import ticketRouter from "@/routers/client/tickets";
import reservationRouter from "@/routers/client/reservation";
import hotelReservationRouter from "@/routers/client/hotelReservation";

import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/enrollments", tokenValidationMiddleware, enrollmentRouter);
router.use("/hotels", hotelRouter);
router.use("/tickets", ticketRouter);
router.use("/reservation", tokenValidationMiddleware, reservationRouter);
router.use("/hotelReservation", tokenValidationMiddleware, hotelReservationRouter);

export default router;

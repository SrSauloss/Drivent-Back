import { Request, Response, NextFunction } from "express";

import ReservationData from "@/interfaces/reservation";
import * as service from "@/services/client/reservation";
import errorHandlingMiddleware from "@/middlewares/errorHandlingMiddleware";

export async function createReservation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const reservationData = req.body as ReservationData;
  reservationData.userId = req.user.id;
  try {
    const reservation = await service.createReservation(reservationData);
    res.status(201).send(reservation);
  } catch (error) {
    next(error);
  }
}

export async function findReservation(req: Request, res: Response, next: NextFunction) {
  const userId = req.user.id;
  try {
    const reservation = await service.findReservation(userId);
    res.status(200).send(reservation);
  } catch (error) {
    next(error);
  }
}

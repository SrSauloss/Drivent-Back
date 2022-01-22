import { Request, Response } from "express";

import ReservationData from "@/interfaces/reservation";
import * as service from "@/services/client/reservation";

export async function createReservation(req: Request, res: Response) {
  const reservationData = req.body as ReservationData;
  reservationData.userId = req.user.id;
  const reservation = await service.createReservation(reservationData);
  res.status(201).send(reservation);
}

export async function findReservation(req: Request, res: Response) {
  const userId = req.user.id;
  const reservation = await service.findReservation(userId);
  res.status(200).send(reservation);
}

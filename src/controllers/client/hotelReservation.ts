import { Request, Response } from "express";
import * as hotelReservationService from "@/services/client/hotelReservation";
import httpStatus from "http-status";

export async function getReservation(req: Request, res: Response) {
  const id = +req.params.id;

  const reservation = await hotelReservationService.getReservationByIdUser(id);
  res.send(reservation);
}

export async function saveReservation(req: Request, res: Response) {
  const userId = +req.user.id;
  const hotelId = +req.params.hotelId;
  const roomId = +req.params.roomId;

  await hotelReservationService.saveReservation(userId, hotelId, roomId);
  res.sendStatus(httpStatus.CREATED);
}

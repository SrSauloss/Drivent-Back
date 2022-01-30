import { NextFunction, Request, Response } from "express";
import * as hotelReservationService from "@/services/client/hotelReservation";
import httpStatus from "http-status";

export async function getReservation(req: Request, res: Response, next: NextFunction) {
  const id = +req.params.id;
  try {
    const reservation = await hotelReservationService.getReservationByIdUser(id);
    res.send(reservation);
  } catch (error) {
    next(error);
  }
}

export async function saveReservation(req: Request, res: Response, next: NextFunction) {
  const userId = +req.user.id;
  const hotelId = +req.params.hotelId;
  const roomId = +req.params.roomId;
  try {
    await hotelReservationService.saveReservation(userId, hotelId, roomId);
    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
}

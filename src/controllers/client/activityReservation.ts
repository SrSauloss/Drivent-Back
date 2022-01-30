import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import * as activitiesReservationService from "@/services/client/activityReservation";
import * as activityService from "@/services/client/activity";

export async function getActivitiesReservation(req: Request, res: Response, next: NextFunction) {
  try{
    const activitiesReservation = await activitiesReservationService.getActivitiesReservation(req.user.id);
    res.send(activitiesReservation);
  }catch(error) {
    next(error);
  }
}

export async function saveReservation(req: Request, res: Response, next: NextFunction) {
  const activity = +req.params.activity;
  try{
    await activityService.saveInscription(req.user.id, activity);
    res.send(httpStatus.CREATED);
  }catch(error) {
    next(error);
  }
}

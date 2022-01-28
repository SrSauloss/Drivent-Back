import { NextFunction, Request, Response } from "express";

import * as activityService from "@/services/client/activity";

export async function getDates(req: Request, res: Response,  next: NextFunction) {
  try{
    const dates = await activityService.getDates();
    res.send(dates);
  }catch(error) {
    next(error);
  }
}

export async function getActivitiesByDate(req: Request, res: Response,  next: NextFunction) {
  const date = req.query.date.toString();
  try{
    const dates = await activityService.getActivitiesByDate(date);
    res.send(dates);
  }catch(error) {
    next(error);
  }
}

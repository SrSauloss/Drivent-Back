import { NextFunction, Request, Response } from "express";

import * as activityService from "@/services/client/activity";

export async function getDates(req: Request, res: Response,  next: NextFunction
) {
  try{
    const dates = await activityService.getDates();
    res.send(dates);
  }catch(error) {
    next(error);
  }
}

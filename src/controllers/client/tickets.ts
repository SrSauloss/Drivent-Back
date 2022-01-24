import { NextFunction, Request, Response } from "express";
import * as ticketsService from "@/services/client/tickets";

export async function getTickets(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const tickets = await ticketsService.getTickets();
  
    res.send(tickets);
  } catch (error) {
    next(error);
  }
}

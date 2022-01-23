import { NextFunction, Request, Response } from "express";
import TicketPrice from "@/entities/TicketPrice";
import errorHandlingMiddleware from "@/middlewares/errorHandlingMiddleware";

export async function getPrices(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const prices = await TicketPrice.getPrices();
    let pricesObj = {};
    prices.forEach((price) => {
      pricesObj = { ...pricesObj, [price.name]: price.price };
    });
    res.send(pricesObj);
  } catch (error) {
    next(errorHandlingMiddleware);
  }
}

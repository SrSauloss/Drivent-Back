import { Request, Response } from "express";
import TicketPrice from "@/entities/TicketPrice";

export async function getPrices(req: Request, res: Response) {
  const prices = await TicketPrice.getPrices();
  let pricesObj = {};
  prices.forEach((price) => {
    pricesObj = { ...pricesObj, [price.name]: price.price };
  });
  res.send(pricesObj);
}

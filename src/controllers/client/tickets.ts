import { Request, Response } from "express";
import TicketPrice from "@/entities/TicketPrice";

export async function getPrices(req: Request, res: Response) {
  console.log(1);
  const prices = await TicketPrice.getPrices();
  let pricesObj = {};
  prices.forEach((price) => {
    pricesObj = { ...pricesObj, [price.name]: price.price };
  });
  console.log(pricesObj);
  res.send(pricesObj);
}

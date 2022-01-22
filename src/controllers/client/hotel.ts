import { Request, Response } from "express";

import * as hotelService from "@/services/client/hotel";

export async function getAll(req: Request, res: Response) {
  const hotels = await hotelService.getAllHotels();
  
  res.send(hotels);
}

export async function getOne(req: Request, res: Response) {
  const id = +req.params.id;
  const hotel = await hotelService.getOneHotel(id);

  res.send(hotel);
}

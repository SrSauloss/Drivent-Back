import { NextFunction, Request, Response } from "express";

import * as hotelService from "@/services/client/hotel";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try{
    const hotels = await hotelService.getAllHotels();
    res.send(hotels);
  }catch(error) {
    next(error);
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  const id = +req.params.id;
  try{
    const hotel = await hotelService.getOneHotel(id);
    res.send(hotel);
  }catch(error) {
    next(error);
  }
}

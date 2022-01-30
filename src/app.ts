import "@/setup";

import express from "express";
import "express-async-errors";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "@/database";
import errorHandlingMiddleware from "@/middlewares/errorHandlingMiddleware";
import router from "@/routers";
import Hotel from "@/entities/Hotel";
import Room from "@/entities/Room";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.send("OK!");
});

app.get("/hotel", async(_req, res) => {
  const hotelsInfos = [{
    name: "Driven Resort",
    image: "https://viagemeturismo.abril.com.br/wp-content/uploads/2015/12/188153847.jpg?quality=70&strip=info",
    numberRooms: 20
  }, {
    name: "Driven Palace",
    image: "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/38/86/38862_v9.jpeg",
    numberRooms: 25
  }, {
    name: "Driven World",
    image: "https://exp.cdn-hotels.com/hotels/9000000/8020000/8012100/8012015/8110a330_y.jpg?impolicy=fcrop&w=500&h=333&q=high",
    numberRooms: 24
  }
  ];

  for( let i = 0; i < hotelsInfos.length; ++i) {
    const hotel = await Hotel.create();

    hotel.name = hotelsInfos[i].name;
    hotel.image = hotelsInfos[i].image;

    await hotel.save();
    hotel.rooms = [];

    for(let j = 0; j < hotelsInfos[i].numberRooms; ++j) {
      const room = new Room();
      room.number = j < 10 ? `10${j}` : `1${j}`;
      room.roomVacancies = (j%3)+1;
      room.occupiedVacancies = 0;
      room.hotelId = hotel.id;
      hotel.rooms.push(room);
    }
    Room.save(hotel.rooms);
  }
  res.send("Hotels created!");
});

app.use(router);
app.use(errorHandlingMiddleware);

export async function init() {
  await connectDatabase();  
}

export default app;

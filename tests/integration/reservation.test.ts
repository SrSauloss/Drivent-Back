import "@/setup";
import app from "../../src/app";
import supertest from "supertest";
import { openConnection, closeConnection, clearDatabase } from "../utils/database";
import * as sessionFactory from "../factories/session.factory";
import * as ticketFactory from "../factories/ticket.factory";
import * as reservationFactory from "../factories/reservation.factory";

beforeAll(async() => {
  await openConnection();
  await clearDatabase();
  // eslint-disable-next-line no-console
  console.error = jest.fn();
});

afterEach(async() => {
  await clearDatabase();
});

afterAll(async() => {
  await closeConnection();
});

describe("POST /reservation/new", () => {
  it("Should return 200 and and an object with the ticket data if the ticketId is valid", async() => {
    const ticket = await ticketFactory.getRandomTicket();
    const { token } = await sessionFactory.createSession();

    const result = await supertest(app)
      .post("/reservation/new")
      .send({ ticketId: ticket.id })
      .set("Authorization", `Bearer ${token}`);
      
    expect(result.status).toEqual(201);
    expect(result.body.id).toEqual(ticket.id);
    expect(result.body.type).toEqual(ticket.name.toLocaleLowerCase());
  });

  it("Should return 404 with non-existent tokenId", async() => {
    const { token } = await sessionFactory.createSession();

    const result = await supertest(app)
      .post("/reservation/new")
      .send({ ticketId: 0 })
      .set("Authorization", `Bearer ${token}`);
      
    expect(result.status).toEqual(404);
  });

  it("Should return 401 with invalid token", async() => {
    const token = "123";

    const result = await supertest(app)
      .post("/reservation/new")
      .send({ ticketId: 0 })
      .set("Authorization", `Bearer ${token}`);
      
    expect(result.status).toEqual(401);
  });
});

describe("GET /reservation", () => {
  it("Should return 200 and an object with reservation data with user with valid reservation", async() => {
    const session = await sessionFactory.createSession();
    const reservation = await reservationFactory.createReservation(session.user.id);

    const result = await supertest(app)
      .get("/reservation")
      .set("Authorization", `Bearer ${session.token}`);

    expect(result.status).toEqual(200);
    expect(result.body).toEqual(reservation);
  });
});

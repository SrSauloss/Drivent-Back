import "@/setup";
import app from "../../src/app";
import supertest from "supertest";
import { openConnection, closeConnection, clearDatabase } from "../utils/database";
import * as sessionFactory from "../factories/session.factory";

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

describe("GET /tickets", () => {
  it("Should return 200 and an object with tickets", async() => {
    const { token } = await sessionFactory.createSession();

    const result = await supertest(app)
      .get("/tickets")
      .set("Authorization", `Bearer ${token}`);
      
    expect(result.status).toEqual(200);
    expect(Object.keys(result.body).length).toBeGreaterThan(0);
  });

  it("Should return 401 for invalid token", async() => {
    const token = "123";

    const result = await supertest(app)
      .get("/tickets")
      .set("Authorization", `Bearer ${token}`);
      
    expect(result.status).toEqual(401);
  });
});

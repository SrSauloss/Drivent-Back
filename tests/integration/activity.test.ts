import "@/setup";
import app, { init } from "../../src/app";
import supertest from "supertest";
import { openConnection, closeConnection, clearDatabase } from "../utils/database";
import { createSession } from "../factories/session.factory";

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

describe("GET /activities/dates", () => {
  it("Should return 401 when user gives an invalid token", async() => {
    const result = await supertest(app).get("/activities/dates");
    expect(result.status).toEqual(401);
  });

  it("Should return 200 and an array of dates when user gives a valid token", async() => {
    const { token } = await createSession();
    const result = await supertest(app).get("/activities/dates").set("Authorization", `Bearer ${token}`);
    expect(result.status).toEqual(200);
    expect(Array.isArray(result.body)).toBe(true);
  });
});

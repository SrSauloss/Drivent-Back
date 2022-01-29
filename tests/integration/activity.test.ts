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
  it("Should return 401 when token is invalid", async() => {
    const result = await supertest(app).get("/activities/dates");
    expect(result.status).toEqual(401);
  });

  it("Should return 200 and an array of dates when token is valid", async() => {
    const { token } = await createSession();
    const result = await supertest(app).get("/activities/dates").set("Authorization", `Bearer ${token}`);
    expect(result.status).toEqual(200);
    expect(Array.isArray(result.body)).toBe(true);
  });
});

describe("GET /activities", () => {
  it("Should return 401 when token is invalid", async() => {
    const result = await supertest(app).get("/activities");
    expect(result.status).toEqual(401);
  });

  it("Should return 200 and an array of activities the parameter date is valid", async() => {
    const { token } = await createSession();
    const result = await supertest(app).get("/activities?date=2022-05-05").set("Authorization", `Bearer ${token}`);
    expect(result.status).toEqual(200);
    expect(Array.isArray(result.body)).toBe(true);
  });

  it("Should return 422 when no date is given", async() => {
    const { token } = await createSession();
    const result = await supertest(app).get("/activities").set("Authorization", `Bearer ${token}`);
    expect(result.status).toEqual(422);
  });

  it("Should return 422 when date is invalid", async() => {
    const { token } = await createSession();
    const result = await supertest(app).get("/activities?date=05-05-2022").set("Authorization", `Bearer ${token}`);
    expect(result.status).toEqual(422);
  });
});

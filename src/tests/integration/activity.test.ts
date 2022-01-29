import "../../setup";
import app from "@/app";
import supertest from "supertest";
import { openConnection, closeConnection, clearDatabase } from "../utils/database";

beforeAll(async() => {
  await openConnection();
//  await clearDatabase();
});

afterEach(async() => {
  await clearDatabase();
});

afterAll(async() => {
  await closeConnection();
});

describe("GET /activities/dates", () => {
  test("returns 401 when user gives an invalid token", async() => {
    const result = await supertest(app).get("/activities/dates");
    console.log(result.status);
    expect(result.status).toEqual(401);
  });
});

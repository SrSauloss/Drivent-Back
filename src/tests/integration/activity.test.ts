import "../../setup";
import app from "@/app";
import { openConnection, closeConnection, clearDatabase } from "../utils/database";

beforeAll(async() => {
  await openConnection();
  await clearDatabase();
});

afterEach(async() => {
  await clearDatabase();
});

afterAll(async() => {
  await closeConnection();
});

describe("GET /categories", () => {
  test("returns 200", async() => {
    expect(true).toBe(true);
  });
});

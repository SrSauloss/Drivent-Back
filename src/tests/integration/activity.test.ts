import { getConnection } from "typeorm";
import supertest from "supertest";
import "@/setup.ts";
import app, { init } from "@/app";

beforeAll(async() => {
  await init();
});

afterAll(async() => {
  await getConnection().close();
});


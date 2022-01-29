import dotenv from "dotenv";
dotenv.config();

const DATABASE_URL = process.env.NODE_ENV !== "test" ? process.env.DATABASE_URL : process.env.DATABASE_URL+"_test";

export default {
  type: "postgres",
  url: DATABASE_URL,
  migrationsTableName: "migrations",
  entities: ["dist/entities/*.js"],
  migrations: ["dist/migrations/*.js"],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  cli: {
    migrationsDir: "src/migrations",
    entitiesDir: "dist/entities/*.js"
  }
};

import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config({ path: "../.env.common" });

const { POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB } = process.env;

const pool = new Pool({
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  database: POSTGRES_DB,
  user: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD
});

const connectToPostgreSqlAsync = async () => {
  try {
    await pool.connect();
  } catch (error) {
    console.log("Error...");
    process.exit(1);
  };
}

export { connectToPostgreSqlAsync, pool };

import { Pool } from "pg";
import { USERNAME, PASSWORD, HOST, PORT, DB } from "./config.js";

const pool = new Pool({
  host: HOST,
  port: PORT,
  database: DB,
  user: USERNAME,
  password: PASSWORD
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

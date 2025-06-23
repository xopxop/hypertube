import { Pool } from "pg";
import { DATABASE_URL } from "./config.js";

const pool = new Pool({
  connectionString: DATABASE_URL,
});

const connectToPostgreSQL = () =>
  pool
    .connect()
    .then(() => console.log("✅ Connected to PostgreSQL"))
    .catch((err) => {
      console.error("❌ PostgreSQL connection error:", err);
      process.exit(1);
    });

export { connectToPostgreSQL };

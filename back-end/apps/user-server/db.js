import { Pool } from "pg";
import { DATABASE_URL } from "./config.js";

const pool = new Pool({
  connectionString: DATABASE_URL,
});

const connectToPostgreSqlAsync = async () => {
  try {
    await pool.connect();
    console.log("✅ Connected to PostgreSQL");
  } catch (error) {
    console.error("❌ PostgreSQL connection error:", err);
    process.exit(1);
  };
}

export { connectToPostgreSqlAsync, pool as db};

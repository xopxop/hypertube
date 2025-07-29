import express from "express";
import { PORT } from "./config.js";
import proxyRoutes from "./proxy.js";
import middlewareRoutes from "./middleware.js";

const app = express();

// Apply middleware routes first (for authentication)
app.use("/", middlewareRoutes);

// Apply proxy routes (for actual routing to services)
app.use("/", proxyRoutes);

app.listen(PORT, () => {
  console.log(`✅ Gateway SERVICE running on http://localhost:${PORT}`);
});

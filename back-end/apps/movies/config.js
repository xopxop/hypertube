import dotenv from "dotenv";
dotenv.config({ path: "../../.env.common" });

const PORT = process.env.MOVIE_SERVICE_PORT;
const GATEWAY_SERVICE_PORT = process.env.GATEWAY_SERVICE_PORT;

export { PORT, GATEWAY_SERVICE_PORT };

import dotenv from "dotenv";
dotenv.config({ path: "../../.env.common" });

const PORT = process.env.MOVIE_SERVICE_PORT;

export { PORT };

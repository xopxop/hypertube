import dotenv from "dotenv";
dotenv.config({ path: "../../.env.common" });

const PORT = process.env.TORRENT_SERVICE_PORT;

export { PORT };

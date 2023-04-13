import dotenv from "dotenv";
dotenv.config();

export const serverPort = process.env.SERVER_PORT;
export const databaseUrl = process.env.MONGODB_URL || "localhost";

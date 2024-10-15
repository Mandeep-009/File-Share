import { configDotenv } from "dotenv";

if(process.env.NODE_ENV!=='production'){
    configDotenv();
}

export const PORT = process.env.PORT;
export const MONGODB_URL = process.env.MONGODB_URL;
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const API_KEY = process.env.API_KEY;
export const API_SECRET = process.env.API_SECRET;
import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const MONGODB_URI = prod ? process.env["MONGODB_URI"] : process.env["MONGODB_URI_LOCAL"];

if (!SESSION_SECRET) {
    logger.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}

if (!MONGODB_URI) {
    if (prod) {
        logger.error("No mongo connection string. Set MONGODB_URI environment variable.");
    } else {
        logger.error("No mongo connection string. Set MONGODB_URI_LOCAL environment variable.");
    }
    process.exit(1);
}

export const EMAIL_SENDER_INFO = {
    user: process.env["EMAIL_SENDER_USER"],
    password: process.env["EMAIL_SENDER_PASS"],
    service: process.env["EMAIL_SENDER_SERVICE"],
};


export const APP_PATHS = {
    VIEWS: path.resolve(process.cwd() + "/views")
};


export const getTemplatePath = (viewName: any) => {
    return path.resolve(APP_PATHS.VIEWS + '/pages/' + viewName + '.ejs')
}

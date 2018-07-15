import winston from 'winston';
import fs from 'fs';
import {
    MLAB_URI,
    SESSION_SECRET
} from './secrets';

const logger = winston.createLogger({
    transports: [
        new(winston.transports.Console)({
            level: "debug"
        }),
        new(winston.transports.File)({
            filename: "debug.log",
            level: "debug"
        })
    ]
});

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
}

export default logger;
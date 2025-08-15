import winston from 'winston';
import path from 'path';

// Bun.main is the path to the entrypoint.
// For a compiled executable, Bun.main is the path to the executable itself,
// which is the same as process.execPath.
// For `bun run`, Bun.main is the path to the script, e.g. src/app.js
const isCompiled = Bun.main === process.execPath;

const logFilename = 'api-proxy.log';

// If compiled, place log file next to the executable.
// Otherwise (in development), place it in the current working directory.
const logPath = isCompiled
    ? path.join(path.dirname(process.execPath), logFilename)
    : path.join(process.cwd(), logFilename);

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: logPath })
    ]

});


export default logger;
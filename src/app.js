import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import logger from './logger.js';
import { Command } from 'commander';

const program = new Command();

// Set up command-line arguments
program
  .version('1.0.0')
  .option('--api-port <number>', 'API port to listen on', '8083') // Default to 8083
  .option('--target-url <url>', 'Target URL for the proxy')
  .parse(process.argv);

const options = program.opts();

const app = express();

// Read the options
const API_PORT = options.apiPort;
const TARGET_URL = options.targetUrl;

if (!TARGET_URL) {
  logger.error('Error: Target URL must be provided using --target-url');
  process.exit(1);
}

// Set up CORS
app.use(cors());

// Set up proxy middleware
app.use('/api', createProxyMiddleware({
    target: TARGET_URL,
    changeOrigin: true,
    logger: logger,
    secure: false,
    pathRewrite: {
        '^/api': ''
    }
}));

// Start the server
app.listen(API_PORT, () => {
    logger.info("Listening to port: " + API_PORT);
});

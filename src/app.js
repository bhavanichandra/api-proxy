import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import logger from './logger.js';

const app = express();
const port = process.env.API_PORT || 8083

app.use(cors());

app.use('/api', createProxyMiddleware({
    target: process.env.API_TARGET_URL,
    changeOrigin: true,
    logger: logger,
    secure: false,
    pathRewrite: {
        '^/api': ''
    }
}))



app.listen(port, () => {
    logger.info("Listening to port: " + port)
});



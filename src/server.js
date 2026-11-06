import express from 'express';
import cors from 'cors';
import { config } from './config/config.js';
import { uploadRouter } from './routes/upload.js';

const app = express();
app.use(cors({ origin: config.allowedOrigin }));
app.use('/api/upload', uploadRouter);
app.listen(config.port, () => console.log(`Upload service en :${config.port}`));
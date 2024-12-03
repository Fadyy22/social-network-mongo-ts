import cors from 'cors';
import compression from 'compression';
import { config } from 'dotenv';
import express from 'express';

import { connectDB } from './common/config/db';
import mountRoutes from './common/utils/mountRoutes';
import globalError from './common/middlewares/error.middleware';
import { configCloudinary } from './common/utils/cloudinary';

const app = express();

config();

connectDB();

configCloudinary();

app.use(cors());
app.use(compression());
app.use(express.json());

mountRoutes(app);

app.use(globalError);

export default app;

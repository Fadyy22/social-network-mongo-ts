import { createServer } from 'http';

import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import express from 'express';

import connectDB from './common/config/db';
import { initializeSocket } from './sockets/init';
import mountRoutes from './common/utils/mountRoutes';
import globalError from './common/middlewares/error.middleware';

dotenv.config();

const app = express();

const server = createServer(app);

initializeSocket(server);

connectDB();

// app.use(morgan('combined'));
app.use(cors());
app.use(compression());
app.use(express.json());

mountRoutes(app);

app.use(globalError);

server.listen(Number(process.env.PORT), process.env.HOST as string, () => {
  console.log(
    `Server running at http://${process.env.HOST}:${process.env.PORT}/`
  );
});

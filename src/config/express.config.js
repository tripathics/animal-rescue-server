import express from "express";
import cookieParser from "cookie-parser";
import routes from '../routes/index.route.js';
import cors from 'cors';
import { errorHandler, notFoundErrorHandler } from "../middlewares/error.middleware.js";

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: process.env.CLIENT_URL.split(';'),
    credentials: true,
  }));
}

app.use(cookieParser());
app.use(express.json());
app.use(routes);

app.use(notFoundErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;

import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { DATABASE_URL } from './utils/secrets';
import logger from './utils/logger';

import * as homeRoute from './requestHandlers/home';
import * as userRoute from './requestHandlers/user';

// Create Express server
const app: express.Express = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    logger.info('Database connected');
  })
  .catch((err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    // process.exit();
  });

app.set('port', process.env.PORT || 4000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', homeRoute.index);
app.post('/login', userRoute.login);
app.post('/signup', userRoute.signup);

app.use((_req, res): void => {
  res.status(404).send({
    success: false,
    error: 'resource not found',
  });
});

export default app;

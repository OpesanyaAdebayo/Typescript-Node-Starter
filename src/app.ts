import express from 'express';
import { Request, Response } from 'express';
import bodyParser from "body-parser";
import session from "express-session";
import mongo from 'connect-mongo';
import mongoose from "mongoose";
import bluebird from "bluebird";
import path from 'path';
const MongoStore = mongo(session);
import { MLAB_URI, SESSION_SECRET } from './utils/secrets';
import logger from './utils/logger';
import { checkInput, checkChangePasswordInput } from './utils/validator'
// import helmet from 'helmet';
// Create Express server
const app:express.Express = express();


app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

(<any>mongoose).Promise = bluebird;
mongoose
  .connect(
    MLAB_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch(err => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    // process.exit();
  });

app.set("port", process.env.PORT || 4000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  store: new MongoStore({
    url: MLAB_URI,
    autoReconnect: true
  })
}));

// app.use(helmet({
//   frameguard: {
//     action: 'deny'
//   }
// }));

import * as homeController from './controllers/home';
import * as userController from './controllers/user';


app.get('/', homeController.index)
app.get('/login', userController.getLogin)
app.post('/login', checkInput, userController.postLogin)
app.get('/signup', userController.getSignup)
app.post('/signup', checkInput, userController.postSignup)
app.post("/changePassword", checkChangePasswordInput, userController.postChangePassword);


app.use((req: Request, res: Response) => {
  if (req.path !== '/' && req.path !== '/login' && req.path !== '/signup') {
      res.sendStatus(404)
  }
});

export default app;
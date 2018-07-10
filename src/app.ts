import express from 'express';
import { Request, Response } from 'express';
import bodyParser from "body-parser";
import path from 'path';
import * as homeController from './controllers/home'
// import helmet from 'helmet';
// Create Express server
const app:express.Express = express();

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");


app.set("port", process.env.PORT || 4000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(helmet({
//   frameguard: {
//     action: 'deny'
//   }
// }));

app.get('/', homeController.index)


//Catch 404 and send to error handler
// app.use((req: Request, res: Response, next: NextFunction) => {
//   let err = new Error('Not Found');
//   next(err);
// });

// error handler
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

//   res.locals.name = err.name
//   res.locals.message = err.message;
//   res.locals.stack = err.stack;
//   res.render('error');
// });

export default app;
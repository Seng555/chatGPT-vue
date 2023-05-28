import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import mongoose, { MongooseOptions } from 'mongoose';
import logger from 'morgan';
import { config } from "./config/config";


//Import 
import { auth } from "./middleware/auth";

//console.log("ssdsdsdsd", process.env.NODE_ENV)


// Router import
import index from './routes/index';
import user from './routes/user';
import chatgpt from './routes/chatgpt';
import authorization  from './routes/auth';



const PORT = config.PORT || 3000;
(global as any).PORT = PORT;
const app: Express = express();
app.use(cors());
app.use(logger('dev'));
app.use(compression())
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(config.MOGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    //middleware
    //app.use(auth)
    //Use router
    app.use('/', index)
    app.use('/user', user)
    app.use('/chatgpt', chatgpt);
    app.use('/auth', authorization);

    // catch 404 and forward to error handler
    app.use(function (req: Request, res: Response, next) {
      res.status(404).json({
        status: 404,
        mss: "404, Not found!",
        data: {}
      })
    });

    // error handler
    app.use(function (err: any, req: Request, res: Response, next: any) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      //console.log("Mssss",res.locals.message)
      // render the error page
      res.status(err.status || 500).json({
        status: err.status,
        mss: `Code:${err.status}, ${err.message}`,
        data: {}
      })
    });
    app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));

  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error);
  });


module.exports = app;

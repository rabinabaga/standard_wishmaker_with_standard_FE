import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import bodyParser from "body-parser";
// import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import cors from "cors";
import "dotenv/config";
import { DB_SECRET } from "./config/config";

// import logger from "./utils/logger";
// import corsConfig from "./config/cors.config";
// import { DEFAULT_APP_PORT } from "./constant/common";
// import { DB_SECRET } from "./config/config";
import connectToDb from "./config/mongodb.config";
import errorHandler from "./middlewares/errorHandler.middleware";
import router from "./routes";

const initializeApp = async (): Promise<Application> => {
  const app: Application = express();
  return app;
};

const startServer = async (
  app: Application,
  port: number | string
): Promise<void> => {
  try {
    await connectToDb(DB_SECRET.DB_URI, DB_SECRET.DB_NAME);

    // serve static files
    // app.use(express.static(path.resolve(__dirname, '../assets')));
    // app.use('/assets', express.static(path.resolve(__dirname, '../assets')));

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());

    // app.use(cors(corsConfig));

    // parse the cookie making it easier to work with cookies
    app.use(cookieParser());

    // Middleware to log incoming requests
    // app.use((req: Request, res, next) => {
    //   logger.info(`Incoming request for: ${req.url}`); // Log the incoming request API path
    //   next();
    // });

    // handle all the incoming api starting with /api
    app.use("/api/v1", router);



    // Default Route
    app.use("/", (req: Request, res: Response) => {
      res.status(200).json({
        msg: `Real state api server listening on http://localhost:${port}. Also CICD working successfully`,
      });
    });

    // Error handling middleware
    app.use(errorHandler);

    // Start the server
    app.listen(port, () => {
      console.log(`App listening on: ${port}`);
      
      // logger.info(`App listening on: http://localhost:${port}`);
    });
  } catch (error) {
    console.log("error", error);
    
    // logger.error("Unable to connect to the database:", error);
  }
};

// Initialize the Express app
initializeApp()
  .then(async (app: Application) => {
    // Start the server after the app has been initialized
    const port = process.env.PORT ?? 8001;
    await startServer(app, port);
  })
  .then(() => {
    console.log("Server started successfully");
    
    // logger.info("Server started successfully");
  })
  .catch((err) => {
   console.log("err", err);
   
  });

// cicd workflow testing again

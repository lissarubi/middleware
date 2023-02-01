import "reflect-metadata";
import express, { Response, Request, NextFunction } from "express";
import cors from "cors";

import { router } from "./routes";

const app = express();

app.use(cors());

app.use(function (request: Request, response: Response, next: NextFunction) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(router);

export { app };

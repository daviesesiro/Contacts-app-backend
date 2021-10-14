import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import passport from "passport";

import passportLoader from "./passport";
import routes from "../api";
import config from "../config";
import LoggerInstance from "./logger";

export default async ({ app }: { app: Application }) => {
  app.enable("trust proxy");
  app.use(cors());
  app.use(express.json());

  await passportLoader();
  app.use(passport.initialize());

  // Load API routes
  app.use(config.api.prefix, routes());

  // catch 404 and forward to error handler
  app.use((_req, _res, next) => {
    const err = new Error("404 Not Found");
    err["code"] = 404;
    err["data"] = "404 not found";
    next(err);
  });

  /// error handlers
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    //Handle 401 thrown by express-jwt library
    if (err.name === "UnauthorizedError")
      return res.status(401).json({ status: "error", data: err.message }).end();

    // handle token expired error
    if (err.name === "TokenExpiredError") return res.status(401).end();

    if (err.message === "Validation failed") {
      //Handle validation error from celebrate
      const errDetails =
        err.details.get("params") || err.details.get("query") || err.details.get("body");

      return res.status(400).json({ status: "error", data: errDetails.details[0].message });
    }

    return next(err);
  });

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.code || 500).json({
      status: "error",
      data: err.data,
    });
  });

  process.on("unhandledRejection", (error, promise) => {
    LoggerInstance.info(" Oh Lord! We forgot to handle a promise rejection here: ", promise);
    LoggerInstance.info(" The error was: ", error);
  });
};

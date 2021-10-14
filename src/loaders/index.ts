import { Application } from "express";

/* eslint-disable @typescript-eslint/no-var-requires */
import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongoose";
import Logger from "./logger";

export default async ({ expressApp }: { expressApp: Application }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info("✌️ DB loaded and connected!");

  const models = [
    {
      name: "userModel",
      model: require("../models/User").default,
    },
    {
      name: "contactModel",
      model: require("../models/Contact").default,
    },
  ];

  await dependencyInjectorLoader({
    models,
  });
  Logger.info("✌️ Dependency Injector loaded");

  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");

  return { mongoConnection };
};

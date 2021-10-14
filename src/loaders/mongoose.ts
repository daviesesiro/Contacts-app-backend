import mongoose from "mongoose";

import config from "../config";

export default async () => {
  // mongodb connection option
  const options = {
    useNewUrlParser: true,
    autoIndex: process.env.NODE_ENV == "development" ? true : false,
    useUnifiedTopology: true,
  };

  //create the connections
  const connection = await mongoose.connect(config.databaseURL, options);

  return connection.connection;
};

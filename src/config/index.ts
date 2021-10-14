import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config();

export default {
  port: parseInt(process.env.PORT!),

  host: process.env.HOST,

  databaseURL:
    process.env.NODE_ENV === "development"
      ? "mongodb://localhost:27017/assessment"
      : (process.env.DB_URL as string),

  jwtSecret: process.env.JWT_SECRET!,
  jwtAlgorithm: process.env.JWT_ALGORITHM!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN!,
  refreshJwtSecret: process.env.REFRESH_JWT_SECRET!,
  refreshJwtExpiresIn: process.env.REFRESH_JWT_EXPIRES_IN!,

  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },

  api: {
    prefix: "/api",
  },
};

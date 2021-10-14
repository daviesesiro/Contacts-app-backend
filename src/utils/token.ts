import jwt from "jsonwebtoken";

import config from "../config";

export const generateJwtToken = ({ _id, email }: JwtPayload) =>
  jwt.sign({ _id, email }, config.jwtSecret, {
    algorithm: config.jwtAlgorithm as jwt.Algorithm,
    expiresIn: config.jwtExpiresIn,
  });

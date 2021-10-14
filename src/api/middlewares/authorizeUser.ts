import passport from "passport";
import { NextFunction, Request, Response } from "express";
// import { UnauthorizedError } from "express-jwt";

const authorizeUser = (...roles: string[]) => {
  return [
    passport.authenticate("jwt"),
    (_req: Request, _res: Response, next: NextFunction) => {
      // no specific user types needed
      if (roles.length === 0) {
        return next();
      }
      // incase of users roles implementation
      // if (roles.some((role) => role === req.user?.userType)) {
      //   return next();
      // } else {
      //// authorized user
      //   return next(new UnauthorizedError("credentials_required", { message: "Not allowed" }));
      // }
    },
  ];
};

export default authorizeUser;

import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { Logger } from "winston";

import { UserLoginDTO, UserRegisterDTO } from "../../interfaces/user";
import { AuthService } from "../../services/auth";
import { validateLoginUser, validateRegisterUser } from "../validation/auth";
import success from "../Response/success";
import authorizeUser from "../middlewares/authorizeUser";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  // POST api/auth/register
  route.post(
    "/register",
    validateRegisterUser(),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      logger.debug("Calling Sign-Up endpoint with body: %o", req.body);

      const authService = Container.get(AuthService);

      try {
        const { user, token } = await authService.registerUser(<UserRegisterDTO>req.body);

        return success(res, { code: 201, data: { user, token } });
      } catch (err) {
        logger.error("Error: %o", err);
        return next(err);
      }
    },
  );

  // POST api/auth/login
  route.post(
    "/login",
    validateLoginUser(),
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = <UserLoginDTO>req.body;

      const logger: Logger = Container.get("logger");
      logger.debug("Calling Sign-In endpoint with body: %o", req.body);

      const authService = Container.get(AuthService);

      try {
        const { user, token } = await authService.loginWithEmailAndPassword(email, password);
        return success(res, { data: { user, token } });
      } catch (err) {
        logger.error("Error: %o", err);
        return next(err);
      }
    },
  );

  // GET api/auth/current-user
  route.get(
    "/current-user",
    authorizeUser(),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      logger.debug("Calling Get current user endpoint with token");

      const authService = Container.get(AuthService);

      try {
        const user = await authService.getCurrentUser(req.user!);

        return success(res, { data: { user } });
      } catch (err) {
        logger.error("Error: %o", err);
        return next(err);
      }
    },
  );
};

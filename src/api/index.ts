import { Router } from "express";

import auth from "./routes/auth";
import user from "./routes/contact";

export default () => {
  const app = Router();
  auth(app);
  user(app);

  return app;
};

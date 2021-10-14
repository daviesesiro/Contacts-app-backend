import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";

import config from "../config";
import User from "../models/User";

export default async () => {
  var jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
    algorithms: [config.jwtAlgorithm],
  } as StrategyOptions;

  passport.use(
    new JwtStrategy(jwtOpts, async (payload: JwtPayload, done) => {
      try {
        const user = await User.findById(payload._id);
        if (user) {
          return done(null, user);
        } else {
          // user doesnt exist
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });
};

import { celebrate, Joi } from "celebrate";

export const validateVerifyEmail = () =>
  celebrate({
    params: Joi.object({ token: Joi.string().required() }),
  });

export const validateLoginUser = () =>
  celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  });

export const validateRegisterUser = () =>
  celebrate({
    body: Joi.object({
      email: Joi.string().required().min(5).email(),
      password: Joi.string().required().min(6),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    }),
  });

export const validateRefreshToken = () =>
  celebrate({
    body: Joi.object({
      refreshToken: Joi.string().required(),
    }),
  });

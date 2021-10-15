import { celebrate, Joi } from "celebrate";

export const validateAddContact = () =>
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      dials: Joi.array()
        .items(
          Joi.object({ kind: Joi.string().required(), dial: Joi.string().required().allow("") }),
        )
        .required(),
      email: Joi.string(),
    }),
  });

export const validateGetContacts = () =>
  celebrate({
    query: Joi.object({
      search: Joi.string(),
    }),
  });

export const validateGetContact = () =>
  celebrate({
    params: Joi.object({
      contactId: Joi.string().length(24),
    }),
  });

export const validateDeleteContact = () =>
  celebrate({
    params: Joi.object({
      contactId: Joi.string().length(24), //mongodb id length
    }),
  });

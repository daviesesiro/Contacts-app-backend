import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { Logger } from "winston";

import {
  validateAddContact,
  validateDeleteContact,
  validateGetContact,
  validateGetContacts,
} from "../validation/contact";
import success from "../Response/success";
import { AddContactDTO } from "../../interfaces/contact";
import { ContactService } from "../../services/contact";
import authorizeUser from "../middlewares/authorizeUser";

const route = Router();

export default (app: Router) => {
  app.use("/contact", route);

  // POST api/contact
  route.post(
    "/",
    authorizeUser(),
    validateAddContact(),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      logger.debug("Calling add new contact endpoint with body: %o", req.body);

      const contactService = Container.get(ContactService);

      try {
        const contact = await contactService.addUserContact(req.user!, <AddContactDTO>req.body);

        return success(res, { code: 201, data: { contact } });
      } catch (err) {
        logger.error("Error: %o", err);
        return next(err);
      }
    },
  );

  // GET api/contact
  route.get(
    "/",
    authorizeUser(),
    validateGetContacts(),
    async (req: Request, res: Response, next: NextFunction) => {
      const { search } = req.query;
      const logger: Logger = Container.get("logger");
      logger.debug("Calling get user contacts endpoint with query: %o", req.query);

      const contactService = Container.get(ContactService);

      try {
        const contacts = await contactService.getUserContacts(req.user!, <string>search);

        return success(res, { data: { contacts } });
      } catch (err) {
        logger.error("Error: %o", err);
        return next(err);
      }
    },
  );

  // GET api/contact/323232323
  route.get(
    "/:contactId",
    authorizeUser(),
    validateGetContact(),
    async (req: Request, res: Response, next: NextFunction) => {
      const { contactId } = req.params;
      const logger: Logger = Container.get("logger");
      logger.debug("Calling get user contacts endpoint with params: %o", req.params);

      const contactService = Container.get(ContactService);

      try {
        const contact = await contactService.getUserContact(req.user!, contactId);

        return success(res, { data: { contact } });
      } catch (err) {
        logger.error("Error: %o", err);
        return next(err);
      }
    },
  );

  // DELETE api/contact/2323239023902323
  route.delete(
    "/:contactId",
    authorizeUser(),
    validateDeleteContact(),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      logger.debug("Calling delete contact endpoint with params: %o", req.params);

      const contactService = Container.get(ContactService);

      try {
        await contactService.deleteUserContact(req.user!, req.params.contactId);

        return success(res, { data: true });
      } catch (err) {
        logger.error("Error: %o", err);
        return next(err);
      }
    },
  );
};

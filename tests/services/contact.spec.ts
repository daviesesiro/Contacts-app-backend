import { Container } from "typedi";
import express from "express";
import { ContactService } from "../../src/services/contact";
import loaders from "../../src/loaders";
import { Connection } from "mongoose";
import Contact from "../../src/models/Contact";

let dbConnection: Connection;

const authUser = {
  _id: "61674ebe11f971934a748816",
  email: "user@exmaple.com",
};

const contactInput = {
  name: "John doe",
  dials: [{ kind: "phone", dial: "02332392332" }],
  email: "test@example.com",
};

beforeAll(async () => {
  const expressApp = express();
  const { mongoConnection } = await loaders({ expressApp });
  dbConnection = mongoConnection;
});

afterAll(async () => {
  const ContactModel = Container.get<typeof Contact>("contactModel");

  await ContactModel.deleteMany({});
  dbConnection.close();
});

describe("Contact service", () => {
  describe("Create Contact", () => {
    it("should create contact record", async () => {
      const contactService = Container.get(ContactService);
      const contact = await contactService.addUserContact(authUser, contactInput);

      expect(contact).toBeDefined();
      expect(contact._id).toBeDefined();
      expect(contact.email).toBe("test@example.com");
      expect(contact.name).toBe("John doe");
      expect(contact.dials).toHaveLength(1);
    });
  });

  describe("Get Contacts", () => {
    it("should get all users", async () => {
      const contactService = Container.get(ContactService);
      const contacts = await contactService.getUserContacts(authUser);

      expect(contacts.length).toBeGreaterThan(0);
    });
    it("should find contact with search", async () => {
      const contactService = Container.get(ContactService);
      const contact = await contactService.addUserContact(authUser, contactInput);
      const contactName = contact.name;
      const contacts = await contactService.getUserContacts(authUser, contactName);

      expect(contacts.length).toBeGreaterThan(0);
    });
  });

  describe("Delete contact", () => {
    it("should delete a contact", async () => {
      const contactService = Container.get(ContactService);
      const contact = await contactService.addUserContact(authUser, contactInput);
      await contactService.deleteUserContact(authUser, contact._id);

      expect(await contactService.getUserContact(authUser, contact._id)).toBe(null);
    });

    it("should throw contact not found", async () => {
      const contactService = Container.get(ContactService);
      const wrongId = "121288930a830a0930219020202";
      await contactService.addUserContact(authUser, contactInput);

      await expect(contactService.deleteUserContact(authUser, wrongId)).rejects.toThrow();
    });
  });
});

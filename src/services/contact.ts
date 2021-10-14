import { Inject, Service } from "typedi";

import { AddContactDTO } from "../interfaces/contact";
import Contact from "../models/Contact";
import { NotFound } from "../api/Response/exceptions";

@Service()
export class ContactService {
  @Inject("contactModel")
  contactModel: typeof Contact;

  async addUserContact(authUser: JwtPayload, input: AddContactDTO) {
    return await this.contactModel.create({ owner: authUser._id, ...input });
  }

  async deleteUserContact(authUser: JwtPayload, id: string) {
    const contact = await this.contactModel.findById(id);
    if (!contact) throw NotFound("Contact not found");
    if (contact.owner.toString() !== authUser._id.toString()) throw NotFound("Contact not found");

    await contact.delete();
  }

  async getUserContacts(authUser: JwtPayload, search?: string) {
    const query: any = { owner: authUser._id };
    if (search) query.name = { $regex: new RegExp(`${search}`, "i") };

    const contacts = await this.contactModel.find(query);

    return contacts;
  }

  async getUserContact(authUser: JwtPayload, contactId: string) {
    const contacts = await this.contactModel.findOne({ _id: contactId, owner: authUser._id });

    return contacts;
  }
}

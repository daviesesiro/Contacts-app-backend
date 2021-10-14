import { Service, Inject } from "typedi";
import { hash, compare } from "bcryptjs";

import User from "../models/User";
import { generateJwtToken } from "../utils/token";
import { IUser, UserRegisterDTO } from "../interfaces/user";
import { BadRequest, NotFound } from "../api/Response/exceptions";

@Service()
export class AuthService {
  @Inject("userModel")
  userModel: typeof User;

  async getCurrentUser(authUser: JwtPayload) {
    const user = await this.userModel.findById(authUser._id, "-password");
    return user;
  }

  async registerUser(data: UserRegisterDTO): Promise<{ token: string; user: IUser }> {
    const hashedPassword = await hash(data.password, 10);
    data.password = hashedPassword;

    try {
      const user = await this.userModel.create(data);
      user.password = undefined;
      return { user, token: generateJwtToken(user) };
    } catch (err) {
      if (err.code === 11000) {
        if (err.keyPattern["email"]) throw BadRequest("Email is already taken");
      }
      throw err;
    }
  }

  async loginWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<{ user: IUser; token: string }> {
    const user = await this.getUserByEmail(email);

    if (!user) throw NotFound("User not found");

    if (!(await compare(password, user.password!))) {
      throw NotFound("User not found");
    }

    user.password = undefined;
    return { user, token: generateJwtToken(user) };
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}

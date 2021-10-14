import { Container } from "typedi";
import express from "express";
import { AuthService } from "../../src/services/auth";
import loaders from "../../src/loaders";
import User from "../../src/models/User";
import { Connection } from "mongoose";

let dbConnection: Connection;

beforeAll(async () => {
  const expressApp = express();
  const { mongoConnection } = await loaders({ expressApp });
  dbConnection = mongoConnection;
});

afterAll(async () => {
  const UserModel = Container.get<typeof User>("userModel");

  await UserModel.deleteMany({ email: "test@example.com" });
  dbConnection.close();
});

describe("Auth service", () => {
  describe("SignUp", () => {
    test("should create user record", async () => {
      const userInput = {
        firstName: "User",
        lastName: "Unit Test",
        email: "test@example.com",
        password: "test",
      };
      const authService = Container.get(AuthService);

      const { user, token } = await authService.registerUser(userInput);
      expect(user).toBeDefined();
      expect(user._id).toBeDefined();
      expect(user.firstName).toBe("User");
      expect(user.lastName).toBe("Unit Test");
      expect(user.email).toBe("test@example.com");
      expect(user.password).not.toBeDefined();
      expect(token).toBeDefined();
    });
  });

  describe("SignIn", () => {
    it("should be able to login", async () => {
      const authService = Container.get(AuthService);
      const { user, token } = await authService.loginWithEmailAndPassword(
        "test@example.com",
        "test",
      );
      expect(user).toBeDefined();
      expect(user._id).toBeDefined();
      expect(user.firstName).toBe("User");
      expect(user.lastName).toBe("Unit Test");
      expect(user.email).toBe("test@example.com");
      expect(user.password).not.toBeDefined();
      expect(token).toBeDefined();
    });

    it("should throw an error when email was not registered yet", async () => {
      const authService = Container.get(AuthService);

      await expect(
        authService.loginWithEmailAndPassword("unexistingemail@unexisting.com", "bliepbloep"),
      ).rejects.toThrow();
    });
  });
});

import * as authService from "../../src/services/client/auth";
import * as userFactory from "./user.factory";

const createSession = async(email?: string, password?: string) => {
  const user = await userFactory.createUser(email, password);
  return authService.signIn(user.email, user.password);
};

export {
  createSession
};

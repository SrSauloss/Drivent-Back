import * as userService from "../../src/services/client/user";

const createUserBody = () => {
  return {
    email: "email@fake.com",
    password: "123456"
  };
};

const createUser = async(email?: string, password?: string) => {
  const fakeUser = createUserBody();
  const user: any = await userService.createNewUser(email || fakeUser.email, password || fakeUser.password);

  return {
    id: user.id,
    email: user.email,
    password: password || fakeUser.password
  };
};

export {
  createUser,
  createUserBody
};

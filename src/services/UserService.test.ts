import { UserService } from "./UserService";
import { User } from "../entities/User";

describe("Test UserService", () => {
  test("It should return the list of users", async () => {
    const userService = new UserService();
    const list: User[] = await userService.getAll();

    expect(typeof list[0].id).toEqual("number");
    expect(typeof list[0].name).toEqual("string");
    expect(typeof list[0].tax).toEqual("number");
  });

  test("It should return one user", async () => {
    const userService = new UserService();
    const user: User | null = await userService.getById("1");

    expect(typeof user).toEqual("object");
    if (user) {
      expect(typeof user.id).toEqual("number");
      expect(typeof user.name).toEqual("string");
      expect(typeof user.tax).toEqual("number");
    }
  });

  test("It should return a null because the user doesn't exist", async () => {
    const userService = new UserService();
    const user: User | null = await userService.getById("999");

    console.log(user);
    expect(user).toEqual(null);
  });
});

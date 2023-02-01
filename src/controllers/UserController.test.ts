const request = require("supertest");
import { app } from "../../src/app";

describe("Test user getAll", () => {
  test("It should response the GET method with a list of users", async () => {
    await request(app)
      .get("/user/list")
      .then((res: any) => {
        const user = res.body[0];

        expect(typeof user.id).toEqual("number");
        expect(typeof user.name).toEqual("string");
        expect(typeof user.tax).toEqual("number");
      });
  });
});

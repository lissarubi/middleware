const request = require("supertest");
import { app } from "../../src/app";

describe("Test product getAll", () => {
  test("It should response the GET method with a list of products", async () => {
    await request(app)
      .get("/product/list")
      .then((res: any) => {
        const firstProduct = res.body[0];

        expect(typeof firstProduct.id).toEqual("number");
        expect(typeof firstProduct.name).toEqual("string");
        expect(typeof firstProduct.price).toEqual("number");
      });
  });
});

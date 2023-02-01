const request = require("supertest");
import { app } from "../../src/app";
import { calculatePercentage } from "../utils/calculatePercentage";

describe("Test cart calculateUserTax", () => {
  test("It should response the GET method with the list of products with tax, and the total price", async () => {
    jest.setTimeout(10000);

    await request(app)
      .get("/cart/tax")
      .send({ userId: 1, productsIds: [1, 2] })
      .then((res: any) => {
        const firstProduct = res.body.products[0];
        const user = res.body.user;

        expect(typeof firstProduct.id).toEqual("number");
        expect(typeof firstProduct.name).toEqual("string");
        expect(typeof firstProduct.price).toEqual("number");

        expect(typeof user.id).toEqual("number");
        expect(typeof user.name).toEqual("string");
        expect(typeof user.tax).toEqual("number");

        expect(calculatePercentage(firstProduct.price, user.tax)).toEqual(
          firstProduct.priceWithTax
        );
      });
  });

  test("It should respond with a BadRequest when sending a user that doesn't exist", async () => {
    jest.setTimeout(10000);

    await request(app)
      .get("/cart/tax")
      .send({ userId: 999999, productsIds: [1, 2] })
      .then((res: any) => {
        expect(res.status).toEqual(400);
      });
  });

  test("It should respond with a BadRequest when sending a product that doesn't exist", async () => {
    jest.setTimeout(10000);

    await request(app)
      .get("/cart/tax")
      .send({ userId: 1, productsIds: [9999] })
      .then((res: any) => {
        expect(res.status).toEqual(404);
      });
  });
});

import { ProductService } from "./ProductService";
import { Product } from "../entities/Product";

describe("Test ProductService", () => {
  test("It should return the list of products", async () => {
    const productService = new ProductService();
    const list: Product[] = await productService.getAll();

    expect(typeof list[0].id).toEqual("number");
    expect(typeof list[0].name).toEqual("string");
    expect(typeof list[0].price).toEqual("number");
  });

  test("It should return one product", async () => {
    const productService = new ProductService();
    const product: Product | null = await productService.getById("1");

    expect(typeof product).toEqual("object");
    if (product) {
      expect(typeof product.id).toEqual("number");
      expect(typeof product.name).toEqual("string");
      expect(typeof product.price).toEqual("number");
    }
  });

  test("It should return a null because the product doesn't exist", async () => {
    const productService = new ProductService();
    const product: Product | null = await productService.getById("999");

    console.log(product);
    expect(product).toEqual(null);
  });
});

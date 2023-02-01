import { Product } from "../entities/Product";
import axios from "axios";

class ProductRepository {
  private products: Product[] = [];

  async update() {
    this.products = await (
      await axios.get("https://mockend.com/juunegreiros/BE-test-api/products")
    ).data;
  }

  async getProducts(): Promise<Product[]> {
    await this.update();
    return this.products;
  }

  async getById(id: string): Promise<Product | null> {
    await this.update();
    return this.products.filter((product) => product.id == id)[0];
  }

  constructor() {
    this.update();
  }
}

export { ProductRepository };

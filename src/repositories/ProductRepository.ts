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
    return this.products;
  }

  async getById(id: string): Promise<Product | null> {
    return this.products.find(product => product.id == id) ?? null
  }

  constructor() {
    this.update();
  }
}

export { ProductRepository };

import { Product } from "../entities/Product";
import axios from "axios";
import { EnvVariables } from "../utils/EnvVariables";

class ProductRepository {
  private products: Product[] = [];
  private env = new EnvVariables()

  async update() {
    if (this.env.PRODUCTS_SERVER){
      this.products = await (
        await axios.get(this.env.PRODUCTS_SERVER)
      ).data;
      return
    }

    console.log("a variável de ambiente PRODUCTS_SERVER não foi definida.")
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

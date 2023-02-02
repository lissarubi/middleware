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

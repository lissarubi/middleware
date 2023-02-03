import { Product } from "../entities/Product";
import axios from "axios";
import { EnvVariables } from "../utils/EnvVariables";

class ProductRepository {
  private products: Product[] = [];
  private updated: boolean = false
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
    if (!this.updated){
      await this.update();
      this.updated = true
    }
    return this.products;
  }

  async getById(id: string): Promise<Product | null> {
    return (await this.getProducts()).find(product => product.id == id) ?? null
  }

  constructor() {
    this.update();
  }
}

export { ProductRepository };

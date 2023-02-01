import { ProductRepository } from "../repositories/ProductRepository";
const productRepository = new ProductRepository();

class ProductService {
  async getAll() {
    return await productRepository.getProducts();
  }
  async getById(id: string) {
    return (await productRepository.getById(id)) ?? null;
  }
}

export { ProductService };

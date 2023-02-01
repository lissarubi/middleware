import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";

import { Product } from "../entities/Product";

const productService = new ProductService();

class ProductController {
  async getAll(request: Request, response: Response): Promise<Response> {
    try {
      const products: Product[] = await productService.getAll();
      return response.status(200).json(products);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}

export { ProductController };

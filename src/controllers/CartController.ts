import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { ProductService } from "../services/ProductService";

import { User } from "../entities/User";
import { Product } from "../entities/Product";

import { calculatePercentage } from "../utils/calculatePercentage";

const userService = new UserService();
const productService = new ProductService();

class CartController {
  async calculateUserTax(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { userId, productsIds } = request.body;

    try {
      const user: User | null = await userService.getById(userId);

      if (!user) {
        return response.status(400).json({
          message: `Não existe uma pessoa usuária com ID ${userId}`,
        });
      }

      const productsWithTax: Product[] = [];
      const notFoundProducts: string[] = [];

      let totalPrice: number = 0;

      // verificar ID por ID dos produtos informados
      await Promise.all(
        productsIds.map(async (id: string) => {
          const product: Product | null = await productService.getById(id);

          if (!product) {
            notFoundProducts.push(id);
          } else {
            product.priceWithTax = Number(
              // calcular preço de um produto baseado em uma porcentagem, ex: 10% de 100 é 10.
              calculatePercentage(product.price, user.tax).toFixed(2)
            );
            totalPrice += product.price;

            productsWithTax.push(product);
          }
        })
      );

      // caso tenha algum(s) produto que não foi encontrado, esses serão informados numa BadRequest
      if (notFoundProducts.length >= 1) {
        return response.status(404).json({
          message: `Não existe um(s) produto(s) com ID ${notFoundProducts.join(
            " "
          )}`,
        });
      }

      return response.status(200).json({
        products: productsWithTax,
        user,
        totalPrice: Number(totalPrice.toFixed(2)),
      });
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}

export { CartController };

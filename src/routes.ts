import { Router } from "express";

import { UserController } from "./controllers/UserController";
import { ProductController } from "./controllers/ProductController";
import { CartController } from "./controllers/CartController";

const router = Router();

const userController = new UserController();
const productController = new ProductController();
const cartController = new CartController();

router.get("/user/list", userController.getAll);
router.get("/product/list", productController.getAll);
router.get("/cart/tax", cartController.calculateUserTax);

export { router };

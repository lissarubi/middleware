import { Request, Response } from "express";
import { UserService } from "../services/UserService";

import { User } from "../entities/User";

const userService = new UserService();

class UserController {
  async getAll(request: Request, response: Response): Promise<Response> {
    try {
      const users: User[] = await userService.getAll();
      return response.status(200).json(users);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}

export { UserController };

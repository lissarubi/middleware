import { UserRepository } from "../repositories/UserRepository";
const userRepository = new UserRepository();

class UserService {
  async getAll() {
    return await userRepository.getUsers();
  }
  async getById(id: string) {
    return (await userRepository.getById(id)) ?? null;
  }
}

export { UserService };

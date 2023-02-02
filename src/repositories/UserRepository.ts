import { User } from "../entities/User";
import axios from "axios";

class UserRepository {
  private users: User[] = [];

  async update() {
    this.users = await (
      await axios.get("https://mockend.com/juunegreiros/BE-test-api/users")
    ).data;
  }

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async getById(id: string): Promise<User | null> {
    return this.users.find(user => user.id == id) ?? null
  }

  constructor() {
    this.update();
  }
}

export { UserRepository };

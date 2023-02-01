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
    await this.update();
    return this.users;
  }

  async getById(id: string): Promise<User | null> {
    await this.update();
    return this.users.filter((user) => user.id == id)[0];
  }

  constructor() {
    this.update();
  }
}

export { UserRepository };

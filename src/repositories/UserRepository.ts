import { User } from "../entities/User";
import axios from "axios";
import { EnvVariables } from "../utils/EnvVariables";

class UserRepository {
  private users: User[] = [];
  private env = new EnvVariables()

  async update() {
    if (this.env.USERS_SERVER){
      this.users = await (
        await axios.get(this.env.USERS_SERVER)
      ).data;
      return
    }

    console.log("a variável de ambiente USERS_SERVER não foi definida.")
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

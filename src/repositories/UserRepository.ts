import { User } from "../entities/User";
import axios from "axios";
import { EnvVariables } from "../utils/EnvVariables";

class UserRepository {
  private users: User[] = [];
  private updated: boolean = false
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
    if (!this.updated){
      await this.update()
      this.updated = true
    }
    return this.users;
  }

  async getById(id: string): Promise<User | null> {
    return (await this.getUsers()).find(user => user.id == id) ?? null
  }

  constructor() {
    this.update().then(() => {
      this.updated = true
    })
  }
}

export { UserRepository };

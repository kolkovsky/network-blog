import { Pool } from "pg";

export class UserDatasource {
  private static instance: UserDatasource;
  // @ts-ignore
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
      user: "postgres",
      host: "127.0.0.1",
      password: "root",
      database: "network",
      port: 5432,
    });
  }

  static getInstance(): UserDatasource {
    if (!UserDatasource.instance) {
      UserDatasource.instance = new UserDatasource();
    }

    return UserDatasource.instance;
  }

  async createUser(data: any): Promise<any> {
    return this.pool.query(
      "INSERT INTO users(firstname, lastname, email, created_on) VALUES($1, $2, $3, $4)",
      [data.request.firstName, data.request.lastName, data.request.email, new Date()]
    );
  }

  async getUserById(id: number): Promise<any> {
    return this.pool.query("SELECT * FROM users WHERE user_id=$1", [id]);
  }

  async getUserByEmail(email: string): Promise<any> {
    return this.pool.query("SELECT * FROM users WHERE email=$1", [email]);
  }
}

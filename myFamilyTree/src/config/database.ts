import { injectable } from "tsyringe";
import { Pool, PoolConnection, createPool } from "mysql2/promise";
import { config } from "./config";

// cau hinh
const connectionConfig = {
    host: config.db.host,
    port: config.db.port,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database
};

@injectable()
export class Database {
  private pool: Pool;
  constructor() {
    console.log("=== DATABASE CONFIG DEBUG ===");
    console.log("DB_HOST:", config.db.host);
    console.log("DB_PORT:", config.db.port);
    console.log("DB_USERNAME:", config.db.username);
    console.log("DB_PASSWORD:", config.db.password ? "***" : "empty");
    console.log("DB_NAME:", config.db.database);
    console.log("=== END DATABASE CONFIG DEBUG ===");
    
    this.pool = createPool(connectionConfig);
    console.log("connect_database success");
  }

  public async getRawConnection(): Promise<PoolConnection> {
    return await this.pool.getConnection();
  }

  public async query(sql: string, values: any[]): Promise<any> {
    let connection: PoolConnection | null = null;

    try {
      connection = await this.pool.getConnection();
      const [results] = await connection.query(sql, values);
      const [outParams] = await connection.query("SELECT @err_code, @err_msg");
      let err: any = outParams;
      if (err[0]["@err_code"] === 0) {
        return results;
      } else {
        throw new Error(err[0]["@err_msg"]);
      }
    } catch (error) {
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  // Raw query - không kiểm tra @err_code/@err_msg (dùng cho SELECT thuần)
  public async rawQuery(sql: string, values: any[]): Promise<any> {
    let connection: PoolConnection | null = null;

    try {
      connection = await this.pool.getConnection();
      const result = await connection.query(sql, values);
      return result;
    } catch (error) {
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
}

import * as dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "./../../.env") });

if (process.env.DEVELOP === "true") {
}

const options = {
  host:
    process.env.DEVELOP === "true"
      ? process.env.MYSQL_HOST
      : process.env.MYSQL_HOST_RAILWAY,
  database:
    process.env.DEVELOP === "true"
      ? process.env.DB_NAME
      : process.env.DB_NAME_RAILWAY,
  user:
    process.env.DEVELOP === "true"
      ? process.env.MYSQL_USER
      : process.env.MYSQL_USER_RAILWAY,
  password:
    process.env.DEVELOP === "true"
      ? process.env.MYSQL_PASSWORD
      : process.env.MYSQL_PASSWORD_RAILWAY,
  port:
    process.env.DEVELOP === "true"
      ? process.env.DB_PORT
      : process.env.MYSQL_PORT_RAILWAY,
  waitForConnections: true,
  connectionLimit: 200,
  queueLimit: 0,
};

export default options;

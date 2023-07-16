import * as dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "./../../.env") });

let host = "";
if (!process.env.DEVELOP || process.env.DEVELOP !== "true") {

  host = "_ALWAYSDATA";

  console.log(process.env[`MYSQL_HOST${host}`]);
  console.log(process.env[`DB_NAME${host}`]);
  console.log(process.env[`MYSQL_USER${host}`]);
  console.log(process.env[`MYSQL_PASSWORD${host}`]);
  console.log(process.env[`MYSQL_PORT${host}`]);
} 

const options = {
  host: process.env[`MYSQL_HOST${host}`],
  database: process.env[`DB_NAME${host}`],
  user: process.env[`MYSQL_USER${host}`],
  password: process.env[`MYSQL_PASSWORD${host}`],
  port: process.env[`MYSQL_PORT${host}`],
  waitForConnections: true,
  connectionLimit: 200,
  queueLimit: 0,
};

export default options;

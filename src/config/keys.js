
import * as dotenv from 'dotenv' 
import {dirname, join} from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({path: join(__dirname,"./../../.env")});



const options = {
    host: process.env.MYSQL_HOST,
    database: process.env.DB_NAME,
    user: process.env.MYSQL_USER ,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
}

export default options


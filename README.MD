

# Indice

[Introduccion](#todo-app-almacenando-imagenes-blob-en-mysql)




# to-do app 
## update almacena imagenes blob en mysql

Aplicación CRUD para definir tareas

Permite crear un perfil de usuario con las credenciales username y password

Es posible cambiar el avatar del usuario

esta aplicación ha sido desarrollada con las siguientes tecnologías principalmente:

* NodeJs
* Pug
* MySQL
* ExpressJs

principales dependecias:

```json
    {   
        "type": "module",
        "main": "app.js",
        "scripts": {
            "start": "node ./src/app.js",
            "dev": "nodemon ./src/app.js"
        }
    },
    "dependencies": {
        "@sinclair/typebox": "^0.25.21",
        "ajv": "^8.12.0",
        "ajv-errors": "^3.0.0",
        "ajv-formats": "^2.1.1",
        "bcrypt": "^5.1.0",
        "connect-flash": "^0.1.1",
        "cookie-parser": "^1.4.6",
        "dotenv": "^16.0.3",
        "express": "^4.18.2",
        "express-mysql-session": "^2.1.8",
        "express-session": "^1.17.3",
        "moment-timezone": "^0.5.40",
        "multer": "^1.4.5-lts.1",
        "mysql2": "^3.0.1",
        "pug": "^3.0.2",
        "sharp": "^0.31.3"
    },

```

dependencias de desarrollo:

```json
    "devDependencies": {
        "@babel/core": "^7.20.12",
        "@babel/preset-env": "^7.20.2",
        "@babel/register": "^7.18.9",
        "autoprefixer": "^10.4.13",
        "browser-sync": "^2.27.11",
        "gulp": "^4.0.2",
        "gulp-babel": "^8.0.0",
        "gulp-postcss": "^9.0.1",
        "gulp-sass": "^5.1.0",
        "nodemon": "^2.0.20",
        "postcss": "^8.4.21",
        "sass": "^1.57.1"
    }
```

# Princiales Configuraciones app.js


```JavaScript
    // Se omite importación y configuración de express

    /**
     * dirname devuelve el directorio donde se encuentra un archivo 
     * join recibe como parametros cadenas y las une en una ruta de archivos válida
    **/
    import {dirname, join} from "path";
    import { fileURLToPath } from "url";

    /**
     * fileURLToPath => convierte una ruta de un archivo en una ruta de sistema de archivos
     * import.meta.url => propiedad de ES6 devuelve la ruta del archivo importador, en este caso app.js
     *  
    **/ 
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    /**
     * dotenv 
     * permite cargar variables de entorno desde un archivo .env
     * las variables de entorno son variables globales que se puede acceder
     * desde cualquier parte de la aplicación  se utilizan para almacenar información
     * confidencial
    **/
    import * as dotenv from 'dotenv';

    /**
     * dotenv.config({parh: ''})
     * indica la ruta donde se encuentra el archivo .env
     * en caso de no encontrarse a nivel de raiz del app
    **/ 
    dotenv.config({path: './../.env'});


    /**
     * Importación de rutas
    **/ 
    import indexRouter from './routes/index.routes.js'

    /**
     * cookie-parser sirve para parsear y poder manipular las cookies a través
     * de: 
     * res.cookie('nombreCookie', 'valorCookie', {maxAge: 1 * 1000 * 60 * 60,...}) 
     * req.cookies => objeto que contiene las cookies enviadas en la solicitud HTTP
    **/ 
    import cookie from 'cookie-parser'
    
    app.use(cookie())


    /**
     *  importar conexion de base de datos
    **/ 
    import {pool} from './config/db.js'


    /**
     * Implementacion para almacenar sesiones en base de datos MySQL en vez de memoria caché 
    **/ 
    import MySQLStore from "express-mysql-session";

    /**
     *  Crea una nueva clase MySQLStorage utilizando la clase MySQLStore de la librería
     *  Recibe como parametro la session
     *  (esta linea de codigo debe ser implementada luego de haber definido el middleware de session)
    **/ 
    const MySQLStorage = MySQLStore(session)


    /**
     *
     *  crea una instancia de clase, recibe como parametros 
     *  options (objeto de opciones de base de datos)
     *  en este caso a options, se le añade la propiedad
     *  createDatabaseTable: true => crea la tabla en la base de datos si no existe
     *  conexion a la pool (si se utiliza mysql2 es necesario utlizar mysql2/promise)
    **/ 
    export const sessionStore = new MySQLStorage({...options, createDatabaseTable: true}, pool)

    /**
     * Middleware que se utiliza para manejar sesiones de aplicaciones
     * es un mecanismo para almacenar datos asociados a un usuario 
     * que va interactuando con la aplicación a traves de varias solicitudes HTTP
    */ 
    import session from "express-session";

    /**
     * name: Nombre de la cookie 
     * secret: clave secreta que se utiliza para firmar y encriptar la cookie
     * resave: booleano que indica si se deben guardar datos de sesion aunque no hayan habido cambios
     * store: almacenamiento utilizado para almacenar los datos de sesiones, por defecto se utilliza un almacenamiento caché en memoria
     * saveUninitialized: almacena la sesion en el almacen de sesiones dependiendo del flag, si es false solo se almacena si se han ingresado datos a la sesion, tales como cookie, o alguna propiedad dentro de session.
     *  cookie: propiedades de la cookie de sesion 
    **/ 
    app.use(session({
        name: 'test-express-session',
        secret: "secret",
        resave: false,
        store: sessionStore,
        saveUninitialized: false,
        cookie: {
            maxAge: 1*1000*60*20,
            httpOnly: true  
        }
    }))

    /**
     * app.set('views', 'ruta') => setea el directorio donde se encuentran las vistas
     * app.set('view engine', 'pug') setea el motor de plantillas a utilizar 
    **/ 
    app.set('views',join(__dirname, '/views/pages/'))
    app.set('view engine', "pug")


    /**
     *  connect-flash es un middleware para Express que permite almacenar mensajes temporales en la sesión del usuario.
    **/ 
    import flash from 'connect-flash'

    /**
     *  usarlo en cualquier ruta
    **/ 
    app.use(flash())

    
    /**
     * app.locals 
     * Es un objeto en Express que proporciona una manera de pasar datos a las vistas. Es un objeto que se usa para almacenar variables que están disponibles en toda la aplicación y se pueden acceder desde cualquier lugar de la aplicación. Estas variables se pueden usar para almacenar datos que se requieren en varias partes de la aplicación, como información de configuración, datos de autenticación, información del usuario, etc.
    **/ 
    app.use( function middle(req, res, next) {

        app.locals.message = req.flash('info')
        next()
    })



    /** 
     *  entiende/parsea los datos que vienen en formato json
    **/
    app.use(express.json())
    
    
    /** 
     *  entiende/parsea los datos que vienen desde un formulario
    **/
    app.use(express.urlencoded({ extended: true }))


    /** 
     *  define la ruta de archivos estaticos
     * 
    **/ 
    app.use(express.static(join(__dirname, "public")));


    /**
     *  Router => es una instancia aislada de middleware y rutas
     *  sirve para modularizar rutas y manejar middlewares especificos 
    **/ 
    app.use(indexRouter)
    
```










# Principales configuraciones de mysql2

```js
    // ./src/config/db.js

    /**
     *  Importa mysql desde mysql2/promise
     *  desde esta instancia mysql no es necesario usar Promise()
    **/ 
    import mysql from 'mysql2/promise'

    const options = {
        host: process.env.MYSQL_HOST,
        database: process.env.DB_NAME,
        user: process.env.MYSQL_USER ,
        password: process.env.MYSQL_PASSWORD,
        port: process.env.DB_PORT,
        waitForConnections: true, //esperar por conexion
        connectionLimit: 10, //maximo 10 conexiones
        queueLimit: 0, //sin limite de cola 
    }

    export const pool = mysql.createPool(options)


    /**
     *  se establece la conexion y libera la conexion a la base de datos 
    **/ 
    pool.getConnection((err, connection) => {
        if(err) {
            if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error("conexion con base de datos ha sido cerrada");
            }
            if(err.code === "ER_CON_COUNT_ERROR") {
                console.error("La base de datos tiene demasiadas conexiones");
            }
            if(err.code === 'ECONNREFUSED') {
                console.error('Conexion con base de datos ha sido rechazada');
            }
        }

        if (connection) connection.release();

        return;
    })

    /**
     *   Evento que se ejecuta cuando se libera una conexion
    **/ 
    pool.on('release', (connection) => {


        console.log("conexion "+ connection.threadId + " liberada");

    })
    /** EJEMPLO DE CONEXION CON UNA QUERY 
     * 
     *  Internamente pool.query realiza consultas a la base de datos
     * tomando conexion de un pool de conexiones
     * cuando se llama a la funcion poo.query se realiza una solicitud de conexion desde el pool de conexiones, una vez obtenida la conexion se utiliza la conexion para ejecutar la consulta, esta conexion se libera automaticamente despues que es completada la consulta y se devuelve el resultado.
    **/ 
    const [rows, fields] = await pool.query('select * from users')

```




































![imagen index](https://i.ibb.co/WtY0z7z/index.png "Index to-do")

![imagen index mobile](https://i.ibb.co/kmFrSH0/index-mobile.png "index mobile")

![imagen index menu mobile](https://i.ibb.co/b11R8sd/index-menu-mobile.png "index menu mobile")


![imagen login](https://i.ibb.co/b2x6VkN/login.png "login desktop")

![imagen login mobile](https://i.ibb.co/6NBt4nc/login-mobile.png "login mobile")


![imagen register](https://i.ibb.co/R3ZyY7F/register.png "register desktop")
![imagen register mobile](https://i.ibb.co/kKQvZCZ/register-mobile.png "register mobile")


![imagen home desktop](https://i.ibb.co/KrhYx3q/home.png "home desktop")
![imagen home mobile](https://i.ibb.co/K09Txxf/home-mobile.png "home mobile")

![imagen tasks desktop](https://i.ibb.co/ZJcTmh8/tasks.png "tasks desktop")
![imagen tasks mobile](https://i.ibb.co/yp2vWhS/tasks-mobile.png "tasks mobile")






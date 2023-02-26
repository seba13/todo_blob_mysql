import {dirname, join} from "path";
import { fileURLToPath } from "url";

import * as dotenv from 'dotenv' 

import moment from 'moment-timezone'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({path: './../.env'});

import express from "express";

import pug from 'pug';

import cookie from 'cookie-parser'
import session from "express-session";
import MySQLStore from "express-mysql-session";
import flash from 'connect-flash'
import indexRouter from './routes/index.routes.js'



// import authRouter from './routes/auth.routes.js'
// import homeRouter from './routes/home.routes.js'
// import todoRouter from './routes/to-do.routes.js'

import options from './config/keys.js'
// import pool from 'mysql2/promise'
import {pool} from './config/db.js'



const PORT = process.env.DEVELOP === true ? 5000 : process.env.PORT  || 8080


const MySQLStorage = MySQLStore(session)
export const sessionStore = new MySQLStorage({...options, createDatabaseTable: true}, pool)

// create express application
const app = express();


// motor engine
app.set('views',join(__dirname, '/views/pages/'))
app.set('view engine', "pug")

// middlewares
app.use(cookie())
app.use(flash())

// entiende los datos que vienen en formato json
app.use(express.json())

// entiende los datos que vienen desde un formulario
app.use(express.urlencoded({ extended: true }))




// la cookie se muestra en formato gmt
// al guardarse se transforma a la zona horario local
// la zona horario en Chile gmt -3 
// date.setHours(date.getHours() + 2)

console.log(process.env.DEVELOP=== "false");


app.use(session({
    name: 'test-express-session',
    secret: "secret",
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    cookie: {
        secure: process.env.DEVELOP === "false",
        maxAge: 1*1000*60*20,
        httpOnly: true,
        // expires: moment.tz(new Date().setSeconds(new Date().getSeconds() + 30 ), 'America/Santiago').toDate()
    }
}))







app.use( function middle(req, res, next) {

    app.locals.message = req.flash('info')
    next()
})







// static files
app.use(express.static(join(__dirname, "public")));


//routes
app.use(indexRouter)
// app.use(authRouter)
// app.use(homeRouter)
// app.use(todoRouter)

// process.on('warning', e => console.warn(e.stack));



app.use( (req, res, next)=> {
    res.status(404).send("Lo siento, la página que buscas no existe.");
})



app.listen(PORT, ()=> {
    console.log("server listen on port " + PORT)
})



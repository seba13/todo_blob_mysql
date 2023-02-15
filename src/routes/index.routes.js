import {Router} from 'express'
import { renderIndex } from '../controllers/index.controller.js'
import {redirectHome} from '../middlewares/home.middleware.js'
const indexRouter = Router()


indexRouter.get("/", redirectHome, renderIndex)


import authRouter from './auth.routes.js'
import homeRouter from './home.routes.js'
import todoRouter from './to-do.routes.js'




indexRouter.use('/', authRouter)
indexRouter.use('/', homeRouter)
indexRouter.use('/', todoRouter)










export  {indexRouter as default} ;




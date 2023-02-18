import {Router} from 'express'
import { renderIndex } from '../controllers/index.controller.js'
import {redirectHome} from '../middlewares/home.middleware.js'
const indexRouter = Router()


import authRouter from './auth.routes.js'
import homeRouter from './home.routes.js'
import todoRouter from './to-do.routes.js'




indexRouter.get("/", redirectHome, renderIndex)


indexRouter.use('/', authRouter)
indexRouter.use('/', homeRouter)
indexRouter.use('/to-do', todoRouter)










export  {indexRouter as default} ;




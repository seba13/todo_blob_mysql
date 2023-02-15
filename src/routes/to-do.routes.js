import {Router} from 'express'
import {renderHome } from '../controllers/home.controller.js'
import {redirectIndex} from "../middlewares/home.middleware.js"
import { renderTodo, NewTaskCtrl, modifyTaskCtrl, modifyStatusTaskCtrl, modifyOrderTaskCtrl, eliminateTaskCtrl } from '../controllers/to-do.controllers.js'
import {validateTask} from '../utils/validations/validate-task-dto.js'



const router = Router()



router.get('/to-do', redirectIndex, renderTodo)
router.post('/to-do/newtask', validateTask, NewTaskCtrl)

router.patch("/to-do/:idTask", validateTask, modifyTaskCtrl)
router.patch("/to-do/:idTask/status", modifyStatusTaskCtrl)

router.patch("/to-do/:idTask/order", modifyOrderTaskCtrl)

router.delete('/to-do/:idTask', eliminateTaskCtrl)

export default router
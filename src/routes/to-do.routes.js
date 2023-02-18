import {Router} from 'express'
import {renderHome } from '../controllers/home.controller.js'
import {redirectIndex} from "../middlewares/home.middleware.js"
import { renderTodo, NewTaskCtrl, modifyTaskCtrl, modifyStatusTaskCtrl, modifyOrderTaskCtrl, eliminateTaskCtrl } from '../controllers/to-do.controllers.js'
import {validateTask} from '../utils/validations/validate-task-dto.js'



const router = Router()



router.get('/', redirectIndex, renderTodo)
router.post('/newtask', validateTask, NewTaskCtrl)

router.patch("/:idTask", validateTask, modifyTaskCtrl)
router.patch("/:idTask/status", modifyStatusTaskCtrl)

router.patch("/:idTask/order", modifyOrderTaskCtrl)

router.delete('/:idTask', eliminateTaskCtrl)

export default router
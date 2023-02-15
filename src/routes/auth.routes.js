

import {Router} from "express";
import { loginController, registerController, renderLogin, renderRegister, logout} from '../controllers/auth.controller.js'
import {redirectHome} from '../middlewares/home.middleware.js'
import {removeSession} from '../middlewares/session.middleware.js'
import { validateLogin } from "../utils/validations/validate-login-dto.js";
import {validateRegister} from '../utils/validations/validate-register-dto.js'

const router = Router();


router.post('/login', validateLogin, loginController)
router.get('/login',redirectHome, renderLogin)


router.post('/register', validateRegister,registerController)
router.get('/register',redirectHome, renderRegister)


router.get('/logout', removeSession, logout)

export default router;
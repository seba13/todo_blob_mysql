


import {Router} from 'express'
import {renderHome, updateUserCtrl, updateImageUserCtrl, getImgUser } from '../controllers/home.controller.js'
import {redirectIndex, middlewareMulter, errorUpload} from "../middlewares/home.middleware.js"

import {validateUserDto} from '../utils/validations/validate-update-user-dto.js'
import formidable from 'express-formidable'

const router = Router()



router.get("/home",redirectIndex, renderHome)




router.patch('/update/image-user', redirectIndex, middlewareMulter,errorUpload, updateImageUserCtrl)


// SE UTILIZA EL MIDDLEWARE DE MULTER PARA PARSEAR EL FORMDATA
router.patch('/update/user', redirectIndex, validateUserDto,updateUserCtrl)




router.get('/getimg', getImgUser)



export default router

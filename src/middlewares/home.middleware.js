import multer from 'multer'
import {dirname, extname, join} from 'path'
import { fileURLToPath } from 'url'
import {removeLogoUser} from '../utils/remove-logo-user.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const MIMETYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]



const configStorage =  multer.diskStorage({
    destination: async(req, file, cb)=>{

        const fileExtension = extname(file.originalname)
        const fileName = "user-"+req.session.userId 

        
        cb(null, join(__dirname, '../public/uploads'))
        

    },
    filename: async(req, file, cb) => {

        const fileExtension = extname(file.originalname)
        const fileName = "user-"+req.session.userId 

        
        await removeLogoUser(fileName, fileExtension)
        
        console.log(file);
       
        cb(null, fileName+fileExtension)
    }
})




const multerUpload = multer({
    storage: configStorage,
    // dest: join(__dirname, '../public/uploads'),
    fileFilter: (req, file, cb) => {

        console.log(file);

        if(MIMETYPES.includes(file.mimetype)){
            return cb(null, true)
        }else {
            cb('formato de archivo invalido');
        }
    },
    // limits: {
    //     fileSize: 1 * 1024 * 1024 * 10
    // }
})



export const errorUpload = ((err, req, res , next) => {

    if(err) {

        console.log(err);

        res.status(400).send({
            error: 'error al subir archivo'
        })
    }else {
        next()
    }

})


export const middlewareMulter = multerUpload.single('logo-user')



export const redirectIndex = (req, res, next) => {
   

    const {userId} = req.session

    
    if(req.session.userId) {
        next()

    }else{
        res.redirect('/')
    }

}

export const redirectHome = (req, res, next) => {


    if(req.session.userId) {

        res.redirect('/home')

    }else {
        next()
    }

}
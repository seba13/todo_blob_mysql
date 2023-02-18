import { getUser } from "./query/users/validityUser.js"
import {updateLogoUser, updateUser} from './query/users/updateUser.js'
import {optimizeImg} from '../utils/remove-logo-user.js'
import {saveBlobImg} from '../controllers/query/users/saveImgBlob.js'
import {getAvatarImg} from '../controllers/query/users/getimgBlob.js'

import {encryptPassword, comparePassword} from '../utils/encrypt-password.js'

import moment from 'moment-timezone'

/**
 * funcion controladora que renderiza el home de un usuario con autenticación
 * de sesion, en caso de no tener autenticacion valida lo redirecciona a la plantilla index
 * @param {request} req 
 * @param {response} res 
 */
export const renderHome = (req, res) => {
    // console.log(req.cookies.user);

    // let userData = req.session.user_data
    // delete req.session.user_data


    // console.log("recibiendo req.session.user: " + JSON.stringify(userData));


    // console.log(req.flash('info'));


    // if(req.cookies.user.username === 'admin') {
        
    //     return res.render("./home",{
    //         // req.cookies lee la propiedad de cookie
    //         // user: req.cookies.user

    //         // al llamar a req.flash se elimina de la memoria flash los datos
    //         // message : req.flash("info")
    //     });
    // }else{
    //     return res.status(403).redirect('/')
    // }

    if(req.session.userId) {

        getUser(req.session.userId)
            .then(user => {

                if(user) {  

                    // console.log(req.session.cookie.maxAge);

                    return res.render('./home', {
                        user: user,
                        date: new Date().setMilliseconds(new Date().getMilliseconds() + req.session.cookie.maxAge)
                        // date: req.session.cookie._expires
                        // date: "hola"
                        
                    })
                }else {
                    return res.status(403).redirect('/')
                }

            })
    }
}



export const updateImageUserCtrl = ( async(req, res) => {

    if(req.file){

        try
        {

            
            // almacenar blob en bd
            let blob = await optimizeImg(req.file.path)


            saveBlobImg(blob, req.file.mimetype, req.session.userId)


            updateLogoUser({"logo-user": "./uploads/"+req.file.filename, idUser: req.session.userId})

            return res.status(202).json({message: "Imagen actualizada con éxito"})
        }catch(err){
            console.log("catch error");
            console.log(err.message);
            return res.status(500).json({error: err.message})
        }
       

    }


})


export const updateUserCtrl = async(req, res) => {

    // SE ALMACENAN LOS DATOS

    console.log("entra en controller");
    

    let user = await getUser(req.session.userId)

    let isValid = await comparePassword(req.body['old-password'], user.password)

    if(!isValid) return res.status(400).json({error: "Contraseña actual incorrecta"})


    console.log(req.body);

    if(req.body['new-password']) {
        req.body['new-password'] = await encryptPassword(req.body['new-password'])
    }


    let rowInfo = await updateUser(req.body, req.session.userId)
    
    if(rowInfo.affectedRows > 0) {
        return res.status(200).json({message: 'Usuario actualizado con éxito'})
    }else{
        return res.status(400).json({error: 'No ha sido posible actualizar usuario'})
    }


    // res.status(200).json({
    //     message: "recibido"
    // })

}



export const getImgUser = async(req, res) => {


    // blob_image, mimetype
    let {blob_image, mimetype} = await getAvatarImg(req.session.userId)

    res.json({buffer: blob_image, mimetype})
}
import { getUser } from "./query/users/validityUser.js"
import {updateLogoUser} from './query/users/updateUser.js'
import {optimizeImg} from '../utils/remove-logo-user.js'
import {saveBlobImg} from '../controllers/query/users/saveImgBlob.js'
import {getAvatarImg} from '../controllers/query/users/getimgBlob.js'


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
                    return res.render('./home', {
                        user: user,
                    })
                }else {
                    return res.status(403).redirect('/')
                }

            })
    }
}



export const updateUserCtrl = ( async(req, res) => {

    if(req.file){

        try
        {

            
            // almacenar blob en bd
            let blob = await optimizeImg(req.file.path)


            saveBlobImg(blob, req.file.mimetype, req.session.userId)


            updateLogoUser({"logo-user": "./uploads/"+req.file.filename, idUser: req.session.userId})

            return res.status(202).json({message: "Datos Actualizados con éxito"})
        }catch(err){
            console.log("catch error");
            console.log(err.message);
            return res.status(500).json({error: err.message})
        }
       

    }


})

export const getImgUser = async(req, res) => {


    // blob_image, mimetype
    let {blob_image, mimetype} = await getAvatarImg(req.session.userId)

    res.json({buffer: blob_image, mimetype})
}
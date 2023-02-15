
import users from '../db/db.js'
import { pool } from '../config/db.js'
import { getUser, getUserByUsername, userExists } from '../controllers/query/users/validityUser.js';
import { registerUser } from "./query/users/registerUser.js"
import { encryptPassword, comparePassword } from '../utils/encrypt-password.js'







export const loginController = ((req, res) => {

    const { username, password } = req.body;


    // recibiendo dato de res.locals
    console.log(res.locals.message);

    // const user = users.find(user => user.username === username && user.password == password)
    console.log("getuser");
    console.log(username);
    getUserByUsername(username)
        .then(user => {


            if (user && !user.deleted) {

                comparePassword(password, user.password)
                    .then(valid => {
                        console.log(valid);
                        if (valid) {

                            req.session.userId = user.id

                            req.session

                            // asignando propiedas en res.session
                            // req.session.user_data = user
                            req.flash('info', [{ title: 'Autenticación', message: ['Usuario Validado !'], status: "success" }])

                            // define una propiedad en cookie llamada user
                            //    res.cookie('user', user)
                            return res.redirect('./home')
                        }
                        else {
                            req.flash('info', [{ title: 'Autenticación', message: ['Usuario o contraseña incorrecta !'], status: "error" }])

                            return res.status(401).redirect('./login')
                        }


                    })


            } else {

                console.log("hola");

                req.flash('info', [{ title: 'Autenticación', message: ['Usuario o contraseña incorrecta !'], status: "error" }])

                return res.status(401).redirect('./login')
            }

        })

})









/**
 * funcion controlador que maneja el registro de usuarios
 * @param {request} req 
 * @param {response} res 
 */
export const registerController = (req, res) => {

    let { username, password, fullname } = req.body

    username = username.trim()
    password = password.trim()
    fullname = fullname.trim()


    // if (username != '' && password != "" && fullname != "") {

        userExists(username)
            .then(exist => {
                if (!exist) {

                    encryptPassword(password)
                        .then(passEncrypted => {

                            registerUser(username, passEncrypted, fullname)
                                .then(insertId => {

                                    if (insertId) {

                                        req.session.userId = insertId

                                        req.flash('info', [{ title: 'Registro', message: ['Usuario Registrado !'], status: "success" }])
                                        res.redirect('/home')
                                    } else {
                                        req.flash('info', [{ title: 'Registro', message: ['Surgio un error al registrar usuario !'], status: "error" }])
                                        res.redirect('/register')
                                    }
                                    console.log(insertId);
                                })
                        })


                } else {
                    req.flash('info', [{ title: 'Registro', message: ['Usuario ya está registrado !'], status: "error" }])
                    res.redirect('/register')
                }
            })

    // } else {
    //     req.flash('info', [{ title: 'Registro', message: ['Campos incompletos'], status: "error" }])
    //     res.redirect('/register')
    // }





}

/**
 * funcion controladora que renderiza la plantilla login
 * @param {request} req 
 * @param {response} res 
 */
export const renderLogin = (req, res) => {

    res.render('./login')
}


/**
 * funcion controladora que renderiza la plantilla registro
 * @param {request} req 
 * @param {response} res 
 */
export const renderRegister = (req, res) => {

    res.render('./register')
}


/**
 * funcion controladora que destruye una sesion activa y redireciona a la plantilla index
 * @param {request} req 
 * @param {response} res 
 */
export const logout = (req, res) => {

    console.log("entra en logout");

    console.log(req.session.id);

    req.session.destroy(err => {
        if (err) {
            console.log("entra en logout 3");
            return res.redirect('/')
        }

        // sessionStore.close()


        res.clearCookie("test-express-session")
        return res.redirect('/')

    })

}







    // Ejemplo query sincrona
    // pool.query('select * from users where users.username=? and password=?',[username, password], (err, rows, fields)=> {

    //     console.log({rows});

    // })

    // pool.query('insert into users(username, password, fullname) values(?,?,?)',["usuario1", 12345, "test usuario"], (err, result)=> {

    // insertiD => RETORNA EL ID DE LA INSERCIÓN SI ES QUE FUE AUTOINCREMENTAL
    //     console.log(result.insertId);

    // })




// Se ejecuta antes que se envie una respuesta al cliente
// es posible enviar informacion a traves de un almacenamiento en
// response.locals
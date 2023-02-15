import Ajv from 'ajv'
import addFormats from "ajv-formats"
import addErrors from 'ajv-errors'

import {Type} from '@sinclair/typebox'


const ajv = new Ajv({allErrors: true})
addFormats(ajv) //formato , se puede añadir formato email en caso de que se requiera insertar un email
addErrors(ajv) //tipo

// const LoginDTOSchema = {
//     "type": "object",
//     "properties": {
//         "username": {
//             "type": "string",
//             minLength : 5,
//             maxLength : 16,
//         },
//         "password": {
//             "type": "string",
//         },
//     },
//     "required": ["username","password"],
//     "additionalProperties": false
// }


// Propertis {} , options {}


const loginSchema = Type.Object({
    username : Type.String({
        minLength : 4,
        maxLength : 16,
        errorMessage: {
            type: 'username debe ser de tipo String',
            maxLength: 'username debe tener un máximo de 16 caracteres',
            minLength: 'username debe tener un mínimo de 4 caracteres'
        }
    }),
    password : Type.String({
        minLength : 5,
        maxLength : 16,
        errorMessage: {
            type: 'contraseña debe ser de tipo String',
            maxLength: 'password debe tener un máximo de 16 caracteres',
            minLength: 'password debe tener un mínimo de 5 caracteres'
        }
    }),
    

}, 
// options
{
    errorMessage: {
        type: 'propiedad debe ser de tipo objeto',
    }
})

const validate = ajv.compile(loginSchema)


/**
 * funcion que maneja formatos y errores de los campos recibidos para iniciar sesion
 * en caso de encontrar un error por parte del cliente retorna un status 400 con el mensaje correspondiente
 * @param {request} req 
 * @param {response} res 
 * @param {next} next
 * @returns {status 200 | 400} 
 */
export const validateLogin = (req, res, next) => {

    console.log("****validateLogin****");

    let {username, password} = req.body

    console.log({username, password});

    const isValid = validate({username, password})


    if(isValid) {
        next()
    }else {
        console.log(validate.errors);

        let mensaje = ajv.errorsText(validate.errors, {separator: "\n"}).replace('data/username','').replace('data/password','').split("\n")

        console.log(mensaje);

        req.flash('info', [{title: 'Autenticación', message: mensaje, status: "error"}])
        res.status(400).redirect('./login')
    }


}
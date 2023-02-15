

import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import addErrors from 'ajv-errors'

import {Type} from '@sinclair/typebox'

const ajv = new Ajv({allErrors: true})
addFormats(ajv)
addErrors(ajv)



const registerSchema = Type.Object({
    username : Type.String({
        maxLength: 16,
        minLength: 4,
        errorMessage: {
            type: 'username debe ser de tipo String',
            maxLength: 'username debe tener un máximo de 16 caracteres',
            minLength: 'username debe tener un mínimo de 4 caracteres'
        }
    }),
    password: Type.String({
        maxLength: 16,
        minLength: 5,
        errorMessage: {
            type: 'contraseña debe ser de tipo String',
            maxLength: 'password debe tener un máximo de 16 caracteres',
            minLength: 'password debe tener un mínimo de 5 caracteres'
        }
    }),
    fullname: Type.String({
        maxLength: 100,
        minLength: 3,
        errorMessage: {
            type: 'fullname debe ser de tipo String',
            maxLength: 'fullname debe tener un máximo de 16 caracteres',
            minLength: 'fullname debe tener un mínimo de 3 caracteres'
        }
    })
}, {
    errorMessage: {
        type: 'propiedad debe ser de tipo objeto',
    }
})


const validate = ajv.compile(registerSchema)


/**
 * funcion que maneja formatos y errores de los campos recibidos para registrarse
 * en caso de encontrar un error por parte del cliente retorna un status 400 con el mensaje correspondiente
 * @param {request} req 
 * @param {response} res 
 * @param {next} next 
 */
export const validateRegister = (req, res, next) => {

    const isValid = validate(req.body)


    if(!isValid){
        let mensaje = ajv.errorsText(validate.errors, {separator: '\n'}).replace('data/username','').replace('data/password','').replace('data/fullname', '').split("\n")

        console.log(mensaje);
    
        req.flash('info', [{title: 'Registro', message: mensaje, status: "error"}])
        return res.status(400).redirect('./register')
    }

    next()

}




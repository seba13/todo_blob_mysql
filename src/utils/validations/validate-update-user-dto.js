

import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import addFormats from 'ajv-formats'
import {Type} from '@sinclair/typebox'


const userSchema = Type.Object({

    "old-password": Type.Optional( Type.String(
        {
            maxLength: 16,
            minLength: 5,
            errorMessage: {
                type: 'contraseña debe ser de tipo String',
                maxLength: 'password debe tener un máximo de 16 caracteres',
                minLength: 'password debe tener un mínimo de 5 caracteres'
            }
        }
    )),
    "new-password" : Type.Optional( Type.String(
        {
            maxLength: 16,
            minLength: 5,
            errorMessage: {
                type: 'contraseña debe ser de tipo String',
                maxLength: 'password debe tener un máximo de 16 caracteres',
                minLength: 'password debe tener un mínimo de 5 caracteres'
            }
        }
    )),
    "fullname" : Type.Optional(Type.String(
        {
            maxLength: 100,
            minLength: 3,
            errorMessage: {
                type: 'fullname debe ser de tipo String',
                maxLength: 'fullname debe tener un máximo de 16 caracteres',
                minLength: 'fullname debe tener un mínimo de 3 caracteres'
            }   
        }
    ))
})


const ajv = new Ajv({allErrors: true})
addFormats(ajv)
addErrors(ajv)


const validate = ajv.compile(userSchema)



export const validateUserDto = (req, res, next) => {

    console.log(req.body);

    const isValid = validate(req.body)

    if(isValid) {
        console.log("datos validos");
        next()
    }else
    {

        console.log(validate.errors);

        // req.flash('info', [{title: 'Autenticación', message: "error de actualizacion", status: "error"}])
        // res.status(400).redirect('./login')

    }

}

import Ajv from 'ajv'
import {Type} from '@sinclair/typebox'
import addFormats from 'ajv-formats'
import addErrors from 'ajv-errors'

const taskSchema = Type.Object({

    nombre: Type.String({
        minLength: 1,
        errorMessage: {
            type: "Titulo debe ser de tipo String",
            minLength: "campo requerido"
        }
    }),
    descripcion : Type.String({
        minLength: 1,
        errorMessage: {
            type: "Descripción debe ser de tipo String",
            minLength: "campo requerido"
        }
    }),
})

const ajv = new Ajv({allErrors: true})
addErrors(ajv)
addFormats(ajv)


const validate = ajv.compile(taskSchema)


export const validateTask = (req, res, next) =>{

    const isValid = validate(req.body)
    
    
    if(isValid) {
        next();
    }
    else
    {
        let mensaje = ajv.errorsText(validate.errors, {separator: '\n'}).replace('data/nombre', "").replace('data/descripcion', "")

        return res.status(400).json({mensaje}) 
    }

}
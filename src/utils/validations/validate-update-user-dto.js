import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import addFormats from 'ajv-formats'
import {Type} from '@sinclair/typebox'


const userSchema = Type.Object({

    "old-password": Type.String(
        {
            maxLength: 16,
            minLength: 5,
            errorMessage: {
                type: 'contraseña debe ser de tipo String',
                maxLength: 'contraseña actual debe tener un máximo de 16 caracteres',
                minLength: 'contraseña actual debe tener un mínimo de 5 caracteres',
            }
        }
    ),
    "new-password" : Type.Optional(Type.String(
        {
            maxLength: 16,
            minLength: 5,
            errorMessage: {
                type: 'contraseña debe ser de tipo String',
                maxLength: 'contraseña nueva debe tener un máximo de 16 caracteres',
                minLength: 'contraseña nueva debe tener un mínimo de 5 caracteres'
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
}, {
    errorMessage: {
        required : {
            'old-password' : 'Por favor ingrese contraseña actual '
        }
    }
})


const ajv = new Ajv({allErrors: true})
addFormats(ajv)
addErrors(ajv)


const validate = ajv.compile(userSchema)



export const validateUserDto = (req, res, next) => {

    console.log(req.body);

    console.log("validateUserDTO");

    let data = {...req.body}

    if( data['old-password'] === '') {
        delete data["old-password"]
        delete req.body["old-password"]
        
        if( data["new-password"] === '' && data["fullname"] === ''){
            delete data["new-password"]
            delete data["fullname"]

            delete req.body["new-password"]
            delete req.body["fullname"]
        }else{
            
            if( data["new-password"] === ''){
                delete data["new-password"]
                delete req.body["new-password"]
            }
            if(data["fullname"] === ''){
                delete data["fullname"]
                delete req.body["fullname"]
            }
        }
    }else
    {
        if( data["new-password"] === '' && data["fullname"] !== ''){
            delete data["new-password"]
            delete req.body["new-password"]
        }
        if(data["fullname"] === '' && data["new-password"] !== ''){
            delete data["fullname"]
            delete req.body["fullname"]
        }
    }
    

    console.log(data);

    const isValid = validate(data)

    if(isValid) {

        console.log("datos validos");

        // req.body.data = data
        console.log("req body dto");
        console.log(req.body);
        next()
    }else
    {
        let message = ajv.errorsText(validate.errors, {separator: '\n', dataVar: ''}).replace('/fullname', '').replace('/new-password','').replace('/old-password','').replace('/','').split('\n')

        // message = message.split('\n').reverse().join('\n')
        // console.log(validate.errors);

        // se está enviando data a traves de fetch por lo que no se puede redireccionar desde acá

        // req.flash('info', [{title: 'Autenticación', message: "error de actualizacion", status: "error"}])
        // res.status(400).redirect('./login')

        res.status(400).json({error: message})
    }

}
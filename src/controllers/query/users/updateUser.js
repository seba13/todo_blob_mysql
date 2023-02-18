
import {pool} from '../../../config/db.js';
import bcrypt from 'bcrypt'






const updateLogoUser = async(data) => {

    
    if(data['logo-user']){
        const [rows, fields] = await pool.query('update users set avatar=? where users.id=?',[data['logo-user'], data.idUser ])
    }

}

/**
 * 
 * @param {*} data  {old-password, new-password, fullname}
 */
const updateUser = async(data, idUser) => {

    // password, fullname
    let arrayFields = []
    let arrayValue = []
    // es posible actualizar la contraseña y fullname
    if(data['old-password'] && data['new-password']) {
        arrayFields.push('password')
        arrayValue.push(data['new-password'])
    }
    if(data['fullname']) {
        arrayFields.push('fullname')
        arrayValue.push(data['fullname'])
    }


    let query = 'update users set '

    arrayFields.forEach( (field, index) => {


        if(index < arrayFields.length -1 ){
            query += `${field}=?, `
        }else{
            query += `${field}=? `
        }


    })
    query += "where id=?"

    arrayValue.push(idUser)


    const [rows, fields] = await pool.query(query,arrayValue)

    return rows
}


export {updateLogoUser, updateUser}
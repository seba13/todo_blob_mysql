


import {pool} from '../../../config/db.js'




export const getAvatarImg = async(idUser)=> {

    const [rows, fields] = await pool.query('select blob_image, mimetype from users where id=?',[idUser])


    return rows[0]

}
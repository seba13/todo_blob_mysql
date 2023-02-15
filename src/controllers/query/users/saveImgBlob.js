

import {pool} from '../../../config/db.js'




export const saveBlobImg = async(blob, mimetype, idUser) => {


    console.log("entra aca");
    console.log(blob);
    console.log(idUser);

    const [rows, fields] = await pool.query('update users set blob_image=? , mimetype=? where id=?',[blob, mimetype, idUser])


    return rows


}
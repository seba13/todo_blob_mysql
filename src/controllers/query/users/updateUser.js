
import {pool} from '../../../config/db.js';







const updateLogoUser = async(data) => {

    
    if(data['logo-user']){
        const [rows, fields] = await pool.query('update users set avatar=? where users.id=?',[data['logo-user'], data.idUser ])
    }

}


export {updateLogoUser}
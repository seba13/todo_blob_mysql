
import {pool} from '../../../config/db.js'




export const userExists = async(username) => { 

    // 1°
    
    // const poolPromise = pool.promise()
    
    // const [rows, fields] = await poolPromise.query("Select * from users where users.username=?",[username])

    // return rows.length > 0;

    
    // 2°

    // return new Promise((resolve, reject) => {

    //     pool.query("Select * from users where users.username=?",[username], (err, result) => {
            
    //         if (err) {
    //             reject(err)
    //         }else{
    //             console.log(result);
                
    //             resolve(result.length > 0)
    //         }
    //     })

    // })


    // 3°
    const [rows, fields] = await pool.query("Select * from users where users.username=?",[username])
    return rows.length > 0;
}

export const getUserByUsername = async(username) => {

    console.log({username});

    const [rows, fields] = await pool.query("Select * from users where users.username=? ",[username])




    return rows[0];

}

// getUser by id
export const getUser = async(idUser) => {


    const [rows, fields] = await pool.query("Select * from users where users.id=? ",[idUser])


    return rows[0];

}
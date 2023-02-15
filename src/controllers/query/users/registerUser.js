import {pool} from '../../../config/db.js'


// s%3An13JK7LUAvHYvmR3_dOmMJY9H8GaxZ2j.y%2BtTeWX%2Fxi39mTr4T0RUnRspVIqOVztpxS3IfqcaYxM

export const registerUser = async(username, password, name) => {

    // 1°
    
    // const poolPromise = pool.promise()

    // const [rows, fields] = await poolPromise.query('Insert into users(username,password,fullname) values(?,?,?)',[username, password, name])


    // return rows.insertId


    // 2°

    // return new Promise((resolve, reject) => {
    //     pool.query('Insert into users(username,password,fullname) values(?,?,?)',[username, password, name], (err, result) => {
    //         console.log("hola");

    //         if(err) {
    //             reject(err);
    //         }else{
    //             console.log(result);

    //             resolve(result.insertId);
    //         }

    //     })
    // })

    // 3°
    const [rows, fields] = await pool.query('Insert into users(username,password,fullname) values(?,?,?)',[username, password, name])
    return rows.insertId
} 
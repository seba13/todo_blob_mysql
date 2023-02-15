
import mysql from 'mysql2/promise'
import options from './keys.js'



    

export const pool = mysql.createPool(options)

pool.getConnection((err, connection) => {
    if(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error("conexion con base de datos ha sido cerrada");
        }
        if(err.code === "ER_CON_COUNT_ERROR") {
            console.error("La base de datos tiene demasiadas conexiones");
        }
        if(err.code === 'ECONNREFUSED') {
            console.error('Conexion con base de datos ha sido rechazada');
        }
    }

    if (connection) connection.release();

    return;
})

pool.on('release', (connection) => {

    console.log("conexion "+ connection.threadId + " lanzada");

})
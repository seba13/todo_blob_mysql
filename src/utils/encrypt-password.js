import bcrypt from 'bcrypt'





/**
 * función asincrona que encripta una contraseña
 * @param {String} plainPassword contraseña en texto plano
 * @returns {string} retorna la contraseña encriptada
 */

export const encryptPassword = async(plainPassword) => {

    const passEncrypted = await bcrypt.hash(plainPassword, 10)

    return passEncrypted

}

/**
 * 
 * @param {String} passEncrypted contraseña del usuario registrado encriptada
 * @param {String} plainPassword contraseña ingresada a comparar
 * @returns {Boolean} retorna true si las contraseñas coinciden
 */
export const comparePassword = async(plainPassword, passEncrypted) => {

    return await bcrypt.compare(plainPassword, passEncrypted)


}
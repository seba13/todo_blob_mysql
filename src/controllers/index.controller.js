


/**
 * funcion controladora que renderiza la plantilla index
 * @param {request} request 
 * @param {response} response 
 * @returns 
 */
const renderIndex = (request, response) => {

    console.log("entra en render index");
    
    // clearCookie elimina la propiedad
    // return response.clearCookie('user').render('./index');
    // const {userId} = request.session;

    // console.log(userId);
    request.session.ipUser = request.ip
    request.session.user = "invitado"

    return response.render('./index');


}

export {renderIndex}
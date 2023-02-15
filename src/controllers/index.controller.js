


/**
 * funcion controladora que renderiza la plantilla index
 * @param {request} request 
 * @param {response} response 
 * @returns 
 */
const renderIndex = (request, response) => {

    
    // clearCookie elimina la propiedad
    // return response.clearCookie('user').render('./index');
    // const {userId} = request.session;

    // console.log(userId);

    return response.render('./index');


}

export {renderIndex}
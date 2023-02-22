
import { IPinfoWrapper } from "node-ipinfo";
import moment from "moment-timezone";
/**
 * funcion controladora que renderiza la plantilla index
 * @param {request} request 
 * @param {response} response 
 * @returns 
 */
const renderIndex = async(request, response) => {

    console.log("entra en render index");
    
    // clearCookie elimina la propiedad
    // return response.clearCookie('user').render('./index');
    // const {userId} = request.session;

    // console.log(userId);

    let ip = request.ip.replace('::ffff:','')

    const ipinfo = new IPinfoWrapper(process.env.GEO_TOKEN, null, 10000);

    let ipData = await ipinfo.lookupIp(ip)
    
    // console.log(ipData);
    // console.log(ipData.country);

    console.log(moment.tz(new Date().setHours(new Date().getHours() - 3 ), 'America/Santiago').toDate());

    request.session.last_connection =  moment.tz(new Date().setHours(new Date().getHours() - 3 ), 'America/Santiago').toDate()
    request.session.ipUser = request.ip
    request.session.country = ipData && ipData.country ? ipData.country : 'Desconocido';
    request.session.city = ipData && ipData.city ? ipData.city : 'Desconocido';
    request.session.user = "invitado"

    return response.render('./index');


}

export {renderIndex}
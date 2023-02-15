

import {sessionStore} from '../app.js'


export const removeSession = (req, res ,next) => {

    sessionStore.destroy(req.session.id, (err) => {

        if(err) {
            console.log(error);
        }

        next();
    })


}
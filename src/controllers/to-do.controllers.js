import { getUser } from "./query/users/validityUser.js"
import { getUserTask, saveTask, modifyTask, modifyStatusTask, modifyOrderTask, eliminateTask } from "./query/users/UserTasks.js"
import { getAvatarImg } from '../controllers/query/users/getimgBlob.js'


/**
 * funcion controladora que renderiza la plantilla to-do 
 * @param {request} req 
 * @param {response} res 
 */
export const renderTodo = (req, res) => {


    if (req.session.userId) {

        getUser(req.session.userId)
            .then(user => {

                if (user) {

                    getUserTask(user.id)
                        .then(tasks => {
                            console.log(tasks);
                            return res.render('./to-do', {
                                user,
                                tasks,
                                date: new Date().setMilliseconds(new Date().getMilliseconds() + req.session.cookie.maxAge)
                            })

                        })
                } else {
                    res.redirect('/')
                }

            })
    }
}


export const NewTaskCtrl = async (req, res) => {



    try {
        const insertTask = await saveTask({ idUser: req.session.userId, ...req.body })



        if (insertTask.idTask) {

            return res.json({
                message: "Tarea agregada con éxito",
                estado: 0,
                ...insertTask
            })
        }
        else {
            return res.status(500).json({
                error: true,
                message: "Surgio un error al guardar tarea",
            })
        }

    } catch (e){

        console.log("catch");

        return res.status(500).json({
            error: true,
            errorMessage: e.message,
            message: "Surgio un error al guardar tarea"
        })
    }
    
   
}

export const modifyTaskCtrl = async (req, res) => {


    const result = await modifyTask(req.body)

    if (result.affectedRows == 1) {

        return res.status(202).json({ message: "tarea actualizada", result })
    } else {
        return res.status(500).json({ message: "Se produjo un error al actualizar tarea" })
    }

}

export const modifyStatusTaskCtrl = async (req, res) => {

    console.log(req.body);

    const result = await modifyStatusTask(req.body)

    console.log(result);

    if (result.affectedRows == 1) {

        return res.status(202).json({ message: "tarea actualizada", result })
    } else {
        return res.status(500).json({ message: "Se produjo un error al actualizar tarea" })
    }
}



export const modifyOrderTaskCtrl = async (req, res) => {

    console.log("order task");

    console.log(req.body);



    const result = await modifyOrderTask(req.body)

    console.log(result);

    if (result.affectedRows == 1) {

        return res.status(202).json({ message: "tarea actualizada", result })
    } else {
        return res.status(500).json({ message: "Se produjo un error al actualizar tarea" })
    }
}



export const eliminateTaskCtrl = async (req, res) => {

    const result = await eliminateTask(req.body)

    console.log(result);

    if (result.affectedRows == 1) {

        return res.status(202).json({ message: "tarea eliminada", result })
    } else {
        return res.status(500).json({ message: "Se produjo un error al eliminar tarea" })
    }
}

export const getImgUser = async (req, res) => {

    const result = await getAvatarImg(req.session.userId)

    console.log(result);

    if (result) {
        return res.status(200).send(result['blob_image'])
    } else {
        return res.status(500).json({ "error": "error al obtener avatar" })
    }
}

let updateUserForm = document.getElementById('form-update-user')
let imgContainer = document.getElementById('img-container')

// let imgUser = document.getElementById('img-user')
let imgUser = undefined



updateUserForm.addEventListener('change', changeImg)
updateUserForm.addEventListener('submit', saveChangesUser)



document.body.addEventListener('load', createImg)

document.body.dispatchEvent(new Event('load'))

async function createImg(e) {

    imgUser = document.createElement('img')
    imgUser.setAttribute('id', 'img-user')
    imgUser.classList.add('user-info__img')

    await getAvatarUser()
    imgContainer.append(imgUser)
    imgUser.addEventListener('error', fallbackImg)

    
}




async function getAvatarUser() {


    try{
        let response = await fetch('/getimg')


        // let buffer = await response.arrayBuffer()
        let json = await response.json()

        if(json.buffer){
            const uint8Array = new Uint8Array(json.buffer.data)

            console.log(uint8Array);

            let blob = new Blob( [uint8Array] , {type: json.mimetype})

            console.log(json.blob);
            console.log(blob);

            let url = URL.createObjectURL(blob)

            console.log(url);

            imgUser.setAttribute('src', url)
        }else{
            throw new Error('Imagen no encontrada')
        }
    }catch(err){
        imgUser.setAttribute('src', '../img/logo-user.webp')
    }

}







/**
 * Agrega una imagen como avatar en caso de no encontrar 
 * el recurso del usuario
 * Por otro lado si el recurso de fallback no se encuentra
 * remueve el evento para evitar un loop infinito
 * @param {*} e event
 */
function fallbackImg(e) {

        e.target.setAttribute('src', '../img/logo-user.webp')

        imgUser.removeEventListener('error', fallbackImg)
}




/**
 * extensiones soportadas de imagen para el avatar de usuario
 */
const MIMETYPES =  ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]



/**
 * 
 * handler de evento change de input file
 * 
 * 
 * cambia el avatar de la imagen si cumple con la validación
 * En caso contrario de no cumplir con la validación, elimina el valor
 * del input file
 * @param {*} e event
 *  
 */
function changeImg(e) {
   

        if(e.target.getAttribute('type') === 'file') {
    
            
            console.log(e.target.files);

            if(e.target.files.length > 0) {
                if(validateImg(e.target.files[0])) {
                    imgUser.setAttribute('src',  URL.createObjectURL(e.target.files[0]))
                }else
                {
                    // e.target.value = ''
                    
                }
            }
            // let fr = new FileReader()
            // fr.readAsDataURL(e.target.files[0])
            // fr.addEventListener('load', (e) => {
            //         imgUser.setAttribute('src', e.target.result)
            // })
            
        }
    
}

/**
 * Valida si el archivo subido corresponde a un archivo de tipo imagen
 * con las extensiones permitidas, 
 * 
 * valida la extension y el mimetype del archivo
 * @param {*} file archivo de imagen
 * @returns boolean
 */
function validateImg(file) {

    let extensionFile = "image/"+file.name.split('.').pop()
    return MIMETYPES.includes(extensionFile) && MIMETYPES.includes(file.type)
}




/**
 * Handler de evento submit.
 * 
 * envia a través de método POST los parametros a actualizar
 * @param {*} e event
 */
function saveChangesUser(e) {

    e.preventDefault()

    // console.log(e.target.elements);

    let formData = new FormData(e.target)


    fetch('/update-user', {

        headers: {
            // "content-Type" : 'multipart/form-data'
        },
        method: 'POST',
        body: formData
    })
    .then(response => {
        return response.json()
    })
    .then(json => {
        if(json.error) {
            throw new Error(json.error)
        }else{
            console.log(json);
        }
    })
    .catch(err => {
        console.log(err.message);
    })

}




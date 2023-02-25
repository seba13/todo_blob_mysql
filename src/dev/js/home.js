
let updateUserForm = document.getElementById('form-update-user')
let imgContainer = document.getElementById('img-container')

// let imgUser = document.getElementById('img-user')
let imgUser = undefined



updateUserForm.addEventListener('change', changeImg)
updateUserForm.addEventListener('submit', updateUser)



// document.body.addEventListener('load', createImg)
createImg()


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

                    // almacena la img en la bd
                    saveImage(e.target)
                }else
                {
                    console.log(e.target.files[0]);

                    createModalMessage({flag: false, title: 'Actualizar Imagen Perfil', message: "Formato de imagen invalido\n extensión archivo seleccionado: ."+e.target.files[0].name.split('.').pop()+'\n Formatos soportados: '+MIMETYPES.join(' ')})

                    e.target.value = ''


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
function saveImage(inputFile) {


    // console.log(e.target.elements);

    let formData = new FormData()

    // formData.append('clave','valor')
    formData.append("logo-user" ,inputFile.files[0])

    console.log("fetch update image user");


    fetch('/update/image-user', {

        headers: {
            // "content-Type" : 'multipart/form-data'
        },
        method: 'PATCH',
        body: formData
    })
    .then(response => {
        return response.json()
    })
    .then(json => {
        if(json.error) {
            throw new Error(json.error)
        }else{
            console.log(json.message);
            createModalMessage({flag: true, title: 'Actualizar Imagen Perfil', message: json.message})
        }
    })
    .catch(err => {
        console.log(err.message);
    })

}


async function updateUser(e){
    e.preventDefault()

    console.log(e.target.elements);


    // ENVIANDO DATA A TRAVES MULTIPART/FORM-DATA 
    // SE DEBE UTILIZAR UN MIDDLEWARE QUE PARSEE EL FORMDATA, COMO MULTER O EXPRESS-FORMIDABLE
    // LOS CAMPOS QUE NO SON FILES EN EXPRESS-FORMIDALBE ESTAN EN REQ.FIELDS

    // let formData = new FormData()


    // // formulario.elements => HTMLFormControlsCollection
    // // formulario.elements.nameInput
    // formData.append('old-password', e.target.elements['old-password'].value)
    // formData.append('new-password', e.target.elements['new-password'].value)
    // formData.append('fullname', e.target.elements['fullname'].value)


    // SEGUNDA OPCION MANDAR LA DATA EN UN JSON
    let data = {
        'old-password' : e.target.elements['old-password'].value,
        'new-password' : e.target.elements['new-password'].value,
        'fullname' : e.target.elements['fullname'].value,
    }



    let response = await fetch('/update/user', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(data)
    })

    let json = await response.json()

    if(json.error) {
        createModalMessage({flag: false, title: 'Actualizar Usuario', message: json.error})
        console.log(json.error);
    }else{
        createModalMessage({flag: true, title: 'Actualizar Usuario', message: json.message})
    }

 
    
}





let modalMessage = document.getElementById('modal-message')



if(modalMessage) {
    modalMessage.addEventListener('animationend', (e) => {

        if(e.animationName == 'hide') {
            e.target.remove()
        }
    })
}



function createModalMessage(data){

    let modalMessage = document.createElement('div')
    
    modalMessage.classList.add('modal-message', data.flag ? 'modal-message--success' : 'modal-message--error')

    let modalMessageTitle = document.createElement('p')
    modalMessageTitle.classList.add('modal-message__title')
    modalMessageTitle.textContent = data.title


    let modalMessageDescription = document.createElement('p')
    modalMessageDescription.classList.add('modal-message__message')
    modalMessageDescription.textContent = data.message


    modalMessage.append(modalMessageTitle)
    modalMessage.append(modalMessageDescription)


    document.body.append(modalMessage)


    modalMessage.addEventListener('animationend', (e) => {
        if(e.animationName == 'hide') {
            e.target.remove()
        }
    })
    
}
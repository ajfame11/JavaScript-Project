class Modal {

    constructor(gameInfo) {

        this.gameInfo = gameInfo
        main.innerHTML = ""

        this.html = document.createElement('div')
        this.html.id = "submit-container"

        this.renderForm()
        


    }

    renderForm = () => {
        const nameForm = document.createElement('form')
    
        const nameLabel = document.createElement('label')
        nameLabel.innerText = "Name: "
    
        this.nameInput = document.createElement('input')
        this.nameInput.type = "text"
    
        const submitButton = document.createElement('input')
        submitButton.type = "submit"
        submitButton.value = "Submit"
    
        nameForm.append(nameLabel, this.nameInput, submitButton)
        this.html.append(nameForm)
    
        nameForm.addEventListener("submit", this.handleSubmit)
    }

    handleSubmit = event => {
        event.preventDefault()
        api.postUserGame({
          user: { name: this.nameInput.value },
          game: { win: this.gameInfo.win }
        })
        event.target.remove()
      }
        
}
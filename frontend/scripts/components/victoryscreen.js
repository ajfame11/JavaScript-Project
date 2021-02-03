class VictoryScreen {
    constructor () {

        // clear main div
        main.innerHTML = ""

        // create victory screen
        const victoryContainer = document.createElement("div")
        victoryContainer.id = "victory-container"

        // message --> tells congrats to winner
        const victoryMessage = document.createElement('p')
        victoryMessage.innerText = `Congrats you won`
        victoryContainer.append(victoryMessage)

        // field to fill out name and post to backend
        const nameForm = document.createElement('form')
        const nameLabel = document.createElement('label')
        // nuttons to see scores or start new game
    }
}
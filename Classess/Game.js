class Game {
    constructor(id, title, imageUrl, description) {
        this._id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
    }
    createDomElement() {
        const container = document.querySelector('.container');
        const gameELement = document.createElement("div");
        gameELement.setAttribute("id", this._id);
        gameELement.innerHTML = `<h1>${this.title}</h1> 
                        <img src="${this.imageUrl}" />
                        <p>${this.description}</p>
                        <button class="delete-btn" id="${this._id}">Delete</button>
                        <button class="update-btn" id="${this._id}">Edit Game</button>`;
        container.appendChild(gameELement);
        document.getElementById(`${this._id}`).addEventListener("click", (event) => {
            if (event.target.classList.contains('delete-btn')) {
                (async function () {
                    const apiResponse = await fetchApi.deleteGame(event.target.getAttribute("id"));
                    // apiResponse = message = "Game gameID deleted!" -> only json file from server removed, gameDiv remains;
                    console.log(apiResponse);
                    // event.target = deleteButton
                    // event.target.parentElement = deleteButton.parentElement
                    // deleteButton.parentElement = gameElement;
                    // => remove gameElement from DOM
                    removeDeletedElementFromDOM(event.target.parentElement);
                })();
            }
            else if (event.target.classList.contains('update-btn')) {
                gameELement.appendChild(updateGameElement);
            }
        });
    }
}


// Afiseaza lista de jocuri
let apiURL = "https://games-app-siit.herokuapp.com";
fetchApi = new FetchApi(apiURL);

async function getGames(){
    const arrayOfGames = await fetchApi.getGamesList();
    console.log(arrayOfGames);

    for(let i = 0; i < arrayOfGames.length; i++) {
        let game = new Game(arrayOfGames[i]._id, arrayOfGames[i].title, arrayOfGames[i].imageUrl, arrayOfGames[i].description);
        game.createDomElement();
    };
}
getGames();

  //functia pentru stergerea elementului din DOM;
 const removeDeletedElementFromDOM = domElement => domElement.remove();
  
  
  const validateFormElement = (inputElement, errorMessage) => {
    if(inputElement.value === "") {
        if(!document.querySelector('[rel="' + inputElement.id + '"]')){
            buildErrorMessage(inputElement, errorMessage);
        }
    } else {
        if(document.querySelector('[rel="' + inputElement.id + '"]')){
            console.log("the error is erased!");
            document.querySelector('[rel="' + inputElement.id + '"]').remove();
            inputElement.classList.remove("inputError");
        }
    }
  }
  
  const validateReleaseTimestampElement = (inputElement, errorMessage) => {
    if(isNaN(inputElement.value) && inputElement.value !== "") {
        buildErrorMessage(inputElement, errorMessage);
    }
  }
  
  const buildErrorMessage = (inputEl, errosMsg) => {
    inputEl.classList.add("inputError");
    const errorMsgElement = document.createElement("span");
    errorMsgElement.setAttribute("rel", inputEl.id);
    errorMsgElement.classList.add("errorMsg");
    errorMsgElement.innerHTML = errosMsg;
    inputEl.after(errorMsgElement);
  }
  
  //Adaugam functionalitate pe butonul de submit;
  
  document.querySelector(".submitBtn").addEventListener("click",(event) => {
    event.preventDefault();
  
    //colectam datele din Form (create form);
    const gameTitle = document.getElementById("gameTitle");
    const gameDescription = document.getElementById("gameDescription");
    const gameGenre = document.getElementById("gameGenre");
    const gamePublisher = document.getElementById("gamePublisher");
    const gameImageUrl = document.getElementById("gameImageUrl");
    const gameRelease = document.getElementById("gameRelease");
  
    //Validam elemenntele care sunt obligatorii(required *);
    validateFormElement(gameTitle, "The title is required!");
    validateFormElement(gameGenre, "The genre is required!");
    validateFormElement(gameImageUrl, "The image URL is required!");
    validateFormElement(gameRelease, "The release date is required!");
  
    validateReleaseTimestampElement(gameRelease, "The release date you provided is not a valid timestamp!");
  
    if(gameTitle.value !== "" && gameGenre.value !== "" && gameImageUrl.value !== "" && gameRelease.value !== "") {
      
        // Daca totul este valid, encodam parametrii pentru  a fi trimisi in request catre Api
        const urlencoded = new URLSearchParams();

        urlencoded.append("title", gameTitle.value);
        urlencoded.append("releaseDate", gameRelease.value);
        urlencoded.append("genre", gameGenre.value);
        urlencoded.append("publisher", gamePublisher.value);
        urlencoded.append("imageUrl", gameImageUrl.value);
        urlencoded.append("description", gameDescription.value);
  
        // facem requestul si folosim raspunsul la afisarea jocului
       
        async function createGame(){
          const game = await fetchApi.createGameRequest(urlencoded);
          const newGame = new Game(game._id, game.title, game.imageUrl, game.description);
          newGame.createDomElement(game);
        }
        createGame();
    }
    //resetam form-ul , golind inputurile, dupa succes submit
    clearInputs();
  })
  
  const clearInputs = () => document.querySelector(".creationForm").reset();
  
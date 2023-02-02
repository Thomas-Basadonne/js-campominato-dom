// Consegna
// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.

/**************************************************
 *                                                *
 *                  ON LOAD                       *
 *                                                *
 **************************************************/
const startGame = document.getElementById("start-game");
// const startGameSelect = document.getElementById("iniziaSelect");

/**************************************************
 *                                                *
 *                  EVENT LISTNER                 *
 *                                                *
 **************************************************/

startGame.addEventListener("click", function () {
  const gridEl = document.getElementById("grid");
  const gridDimension = 100;
  generaGriglia(gridEl, gridDimension);
});

/**************************************************
 *                                                *
 *                  FUNCIONS                      *
 *                                                *
 *  @param {HTMLElement} grid dove inserire griglia
 *  @param {int} dimension   dimensioni griglia   *
 **************************************************/

function generaGriglia(grid, gridDimension) {
  grid.innerHTML = "";

  //random number
  const whitelist = [];
  for (let i = 0; i < gridDimension; i++) {
    whitelist.push(i + 1);
  }

  // per 100 volte
  for (let i = 0; i < gridDimension; i++) {
    // prendo un indice random whitelist
    const randomWhitelistIndex = generateRandomNumber(0, whitelist.length - 1);
    const testoCella = whitelist[randomWhitelistIndex];

    // rimuovo dalla whitelist
    whitelist.splice(randomWhitelistIndex, 1);

    // genero div e lo aggiungo html
    const cella = document.createElement("div");
    cella.append(testoCella);

    // aggiungo classe alla cella
    cella.classList.add("square");

    cella.addEventListener("click", function () {
      this.classList.toggle("active");
      console.log(this.innerHTML);
    });
    grid.append(cella);
  }
}

function generateRandomNumber(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
}

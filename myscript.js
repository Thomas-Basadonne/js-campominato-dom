// Consegna
//Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell'array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha cliccato su una cella che non era una bomba.

/**************************************************
 *                                                *
 *                  ON LOAD                       *
 *                                                *
 **************************************************/
const startGame = document.getElementById("start-game");

// ARRY BOMBE
let bombe = [];
while (bombe.length < 16) {
  bombNumber = Math.floor(Math.random() * 100) + 1;

  if (!bombe.includes(bombNumber)) {
    bombe.push(bombNumber);
  }
}
console.log(bombe);
// const startGameSelect = document.getElementById("iniziaSelect");

/**************************************************
 *                                                *
 *                  EVENT LISTNER                 *
 *                                                *
 **************************************************/

startGame.addEventListener("click", function () {
  const gridEl = document.getElementById("grid");
  const difficultLevel = document.getElementById("difficulty");
  const level = difficultLevel.value;
  generaGriglia(gridEl, level);
});

/**************************************************
 *                                                *
 *                  FUNCIONS                      *
 *                                                *
 *  @param {HTMLElement} grid dove inserire griglia
 *  @param {int} difficolta   dimensioni griglia   *
 **************************************************/

function generaGriglia(grid, difficolta) {
  grid.innerHTML = "";

  let numeroCelle;
  if (difficolta == 1) {
    numeroCelle = 100;
  } else if (difficolta == 2) {
    numeroCelle = 81;
  } else {
    numeroCelle = 49;
  }
  //random number
  const whitelist = [];
  for (let i = 0; i < numeroCelle; i++) {
    whitelist.push(i + 1);
  }

  // per 100 volte
  for (let i = 0; i < numeroCelle; i++) {
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

    if (difficolta == 2) {
      cella.classList.add("medium-square");
    } else if (difficolta == 3) {
      cella.classList.add("big-square");
    }

    cella.addEventListener("click", function () {
      let celleSafe = document.getElementsByClassName("active").length;

      if (celleSafe == 84) {
        document.getElementById("result").innerHTML =
          "COMPLIMENTI HAI VINTO!!!";
      }

      if (bombe.includes(parseInt(this.innerHTML))) {
        this.classList.toggle("bomb");
        document.getElementById("result").innerHTML =
          "Prima di esplodere hai trovato " + celleSafe + " celle :(";
      } else {
        this.classList.toggle("active");
      }

      console.log(this.innerHTML);
    });
    grid.append(cella);
  }
}

function generateRandomNumber(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
}

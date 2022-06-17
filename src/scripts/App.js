import Ship from "./Ship";
import { Gameboard, xLast, yLast } from "./Gameboard";
import Player from "./Player";
import "../styles/App.css";

let turn = true;

const changeTurn = () => {
  turn = !turn;
};

const STR_CARRIER = "carrier";
const STR_BATTLESHIP = "battleship";
const STR_CRUISER = "cruiser";
const STR_SUBMARINE = "submarine";
const STR_DESTROYER = "destroyer";

const headerCreated = document.createElement("header");
headerCreated.classList.add("header");
const h1Created = document.createElement("h1");
h1Created.innerHTML = `Sh<span>i</span>ps<span>!</span>`;
headerCreated.appendChild(h1Created);
const buttonsContainerCreated = document.createElement("div");
buttonsContainerCreated.classList.add("buttons-container");
const mainCreated = document.createElement("main");
mainCreated.classList.add("main");
const footerCreated = document.createElement("footer");
footerCreated.classList.add("footer");
footerCreated.innerHTML = `
Copyright &copy; 2022 ruslantoleuov
<a
  title='Checkout my GitHub page'
  href="https://github.com/ruslantoleuov"
  target="_blank"
  rel="noopener noreferrer"
>
  <svg class="github-icon" viewBox="0 0 20 19.51549">
    <path
      d="M 10,0 A 10,10 0 0 0 0,10 c 0,4.42 2.87,8.17 6.84,9.5 0.5,0.08 0.66,-0.23 0.66,-0.5 0,-0.23 0,-0.86 0,-1.69 C 4.73,17.91 4.14,15.97 4.14,15.97 3.68,14.81 3.03,14.5 3.03,14.5 2.12,13.88 3.1,13.9 3.1,13.9 c 1,0.07 1.53,1.03 1.53,1.03 C 5.5,16.45 6.97,16 7.54,15.76 7.63,15.11 7.89,14.67 8.17,14.42 5.95,14.17 3.62,13.31 3.62,9.5 3.62,8.39 4,7.5 4.65,6.79 4.55,6.54 4.2,5.5 4.75,4.15 c 0,0 0.84,-0.27 2.75,1.02 0.79,-0.22 1.65,-0.33 2.5,-0.33 0.85,0 1.71,0.11 2.5,0.33 1.91,-1.29 2.75,-1.02 2.75,-1.02 0.55,1.35 0.2,2.39 0.1,2.64 0.65,0.71 1.03,1.6 1.03,2.71 0,3.82 -2.34,4.66 -4.57,4.91 0.36,0.31 0.69,0.92 0.69,1.85 0,1.34 0,2.42 0,2.74 0,0.27 0.16,0.59 0.67,0.5 C 17.14,18.16 20,14.42 20,10 A 10,10 0 0 0 10,0 Z"
    />
  </svg>
</a>
`;

document.body.append(
  headerCreated,
  buttonsContainerCreated,
  mainCreated,
  footerCreated
);

const init = () => {
  const rotateButtonCreated = document.createElement("button");
  rotateButtonCreated.setAttribute("type", "button");
  rotateButtonCreated.classList.add("button");
  rotateButtonCreated.textContent = "Rotate";
  const resetButtonCreated = document.createElement("button");
  resetButtonCreated.classList.add("button");
  resetButtonCreated.textContent = "Reset";
  buttonsContainerCreated.append(rotateButtonCreated, resetButtonCreated);
  const playerGameboardDivCreated = document.createElement("div");
  playerGameboardDivCreated.classList.add("gameboard");
  playerGameboardDivCreated.classList.add("player-board");
  const computerGameboardDivCreated = document.createElement("div");
  computerGameboardDivCreated.classList.add("gameboard");
  computerGameboardDivCreated.classList.add("computer-board");

  const player = Player();
  const computer = Player(true);
  computer.generateRandomBoard();
  let rotate = true;
  let count = 0;

  const createShipDiv = (
    ship,
    rows,
    cols,
    x,
    y,
    rotate,
    player,
    isClicked = false
  ) => {
    if (count < 5) {
      const appendDivInsideCol = (rotate) => {
        for (let i = 0; i < ship.length; i++) {
          const shipDiv = document.createElement("div");
          if (isClicked) shipDiv.dataset.shipType = ship.type;
          shipDiv.classList.add("ship");

          if (rotate) {
            rows[x + i].children[y].appendChild(shipDiv);
          } else {
            cols[y + i].appendChild(shipDiv);
          }
        }
      };

      if (rotate) {
        if (ship.type === STR_CARRIER) {
          if (
            x < 10 &&
            !rows[x].children[y].children[0] &&
            x + 1 < 10 &&
            !rows[x + 1].children[y].children[0] &&
            x + 2 < 10 &&
            !rows[x + 2].children[y].children[0] &&
            x + 3 < 10 &&
            !rows[x + 3].children[y].children[0] &&
            x + 4 < 10 &&
            !rows[x + 4].children[y].children[0]
          ) {
            appendDivInsideCol(rotate);
          } else if (isClicked) {
            for (let i = 0; i < ship.length; i++) {
              rows[x + i].children[y].children[0].dataset.shipType = ship.type;
            }
          }
        } else if (ship.type === STR_BATTLESHIP) {
          if (
            x < 10 &&
            !rows[x].children[y].children[0] &&
            x + 1 < 10 &&
            !rows[x + 1].children[y].children[0] &&
            x + 2 < 10 &&
            !rows[x + 2].children[y].children[0] &&
            x + 3 < 10 &&
            !rows[x + 3].children[y].children[0]
          ) {
            appendDivInsideCol(rotate);
          } else if (isClicked) {
            for (let i = 0; i < ship.length; i++) {
              rows[x + i].children[y].children[0].dataset.shipType = ship.type;
            }
          }
        } else if (ship.type === STR_CRUISER) {
          if (
            x < 10 &&
            !rows[x].children[y].children[0] &&
            x + 1 < 10 &&
            !rows[x + 1].children[y].children[0] &&
            x + 2 < 10 &&
            !rows[x + 2].children[y].children[0]
          ) {
            appendDivInsideCol(rotate);
          } else if (isClicked) {
            for (let i = 0; i < ship.length; i++) {
              rows[x + i].children[y].children[0].dataset.shipType = ship.type;
            }
          }
        } else if (ship.type === STR_SUBMARINE) {
          if (
            x < 10 &&
            !rows[x].children[y].children[0] &&
            x + 1 < 10 &&
            !rows[x + 1].children[y].children[0] &&
            x + 2 < 10 &&
            !rows[x + 2].children[y].children[0]
          ) {
            appendDivInsideCol(rotate);
          } else if (isClicked) {
            for (let i = 0; i < ship.length; i++) {
              rows[x + i].children[y].children[0].dataset.shipType = ship.type;
            }
          }
        } else if (ship.type === STR_DESTROYER) {
          if (
            x < 10 &&
            !rows[x].children[y].children[0] &&
            x + 1 < 10 &&
            !rows[x + 1].children[y].children[0]
          ) {
            appendDivInsideCol(rotate);
          } else if (isClicked) {
            for (let i = 0; i < ship.length; i++) {
              rows[x + i].children[y].children[0].dataset.shipType = ship.type;
            }
          }
        }
      } else {
        if (ship.type === STR_CARRIER) {
          if (
            y < 10 &&
            !cols[y].children[0] &&
            y + 1 < 10 &&
            !cols[y + 1].children[0] &&
            y + 2 < 10 &&
            !cols[y + 2].children[0] &&
            y + 3 < 10 &&
            !cols[y + 3].children[0] &&
            y + 4 < 10 &&
            !cols[y + 4].children[0]
          ) {
            appendDivInsideCol(rotate);
          } else if (isClicked) {
            for (let i = 0; i < ship.length; i++) {
              cols[y + i].children[0].dataset.shipType = ship.type;
            }
          }
        } else if (ship.type === STR_BATTLESHIP) {
          if (
            y < 10 &&
            !cols[y].children[0] &&
            y + 1 < 10 &&
            !cols[y + 1].children[0] &&
            y + 2 < 10 &&
            !cols[y + 2].children[0] &&
            y + 3 < 10 &&
            !cols[y + 3].children[0]
          ) {
            appendDivInsideCol(rotate);
          } else if (isClicked) {
            for (let i = 0; i < ship.length; i++) {
              cols[y + i].children[0].dataset.shipType = ship.type;
            }
          }
        } else if (ship.type === STR_CRUISER) {
          if (
            y < 10 &&
            !cols[y].children[0] &&
            y + 1 < 10 &&
            !cols[y + 1].children[0] &&
            y + 2 < 10 &&
            !cols[y + 2].children[0]
          ) {
            appendDivInsideCol(rotate);
          } else if (isClicked) {
            for (let i = 0; i < ship.length; i++) {
              cols[y + i].children[0].dataset.shipType = ship.type;
            }
          }
        } else if (ship.type === STR_SUBMARINE) {
          if (
            y < 10 &&
            !cols[y].children[0] &&
            y + 1 < 10 &&
            !cols[y + 1].children[0] &&
            y + 2 < 10 &&
            !cols[y + 2].children[0]
          ) {
            appendDivInsideCol(rotate);
          } else if (isClicked) {
            for (let i = 0; i < ship.length; i++) {
              cols[y + i].children[0].dataset.shipType = ship.type;
            }
          }
        } else if (ship.type === STR_DESTROYER) {
          if (
            y < 10 &&
            !cols[y].children[0] &&
            y + 1 < 10 &&
            !cols[y + 1].children[0]
          ) {
            appendDivInsideCol(rotate);
          } else if (isClicked) {
            for (let i = 0; i < ship.length; i++) {
              cols[y + i].children[0].dataset.shipType = ship.type;
            }
          }
        }
      }

      if (isClicked) {
        player.gameboard.placeShips(ship, x, y, rotate);

        if (ship.position.x.length !== 0 && ship.position.y.length !== 0) {
          return count++;
        }
      }
    }
  };

  const removeShipIfPositionChanged = () => {
    for (const ship of playerGameboardDivCreated.querySelectorAll(".ship")) {
      if (!ship.dataset.shipType) ship.remove();
    }
  };

  const placeShipPositionOnGrid = (
    player,
    rotate,
    target,
    isClicked = false
  ) => {
    if (count < 5) {
      const shipTypes = Object.keys(player.gameboard.warships);
      const ship = player.gameboard.warships[shipTypes[count]];
      const col = target;
      const row = target.parentElement;
      const cols = target.parentElement.children;
      const rows = playerGameboardDivCreated.children;
      const x = Number(row.dataset.position);
      const y = Number(col.dataset.position);

      if (player.gameboard.grid[x][y] === undefined) {
        if (ship.type === STR_CARRIER) {
          if (rotate) {
            if (
              x + 1 < 10 &&
              player.gameboard.grid[x + 1][y] === undefined &&
              x + 2 < 10 &&
              player.gameboard.grid[x + 2][y] === undefined &&
              x + 3 < 10 &&
              player.gameboard.grid[x + 3][y] === undefined &&
              x + 4 < 10 &&
              player.gameboard.grid[x + 4][y] === undefined
            ) {
              createShipDiv(ship, rows, cols, x, y, rotate, player, isClicked);
            }
          } else {
            if (
              y + 1 < 10 &&
              player.gameboard.grid[x][y + 1] === undefined &&
              y + 2 < 10 &&
              player.gameboard.grid[x][y + 2] === undefined &&
              y + 3 < 10 &&
              player.gameboard.grid[x][y + 3] === undefined &&
              y + 4 < 10 &&
              player.gameboard.grid[x][y + 4] === undefined
            ) {
              createShipDiv(ship, rows, cols, x, y, rotate, player, isClicked);
            }
          }
        } else if (ship.type === STR_BATTLESHIP) {
          if (rotate) {
            if (
              x + 1 < 10 &&
              player.gameboard.grid[x + 1][y] === undefined &&
              x + 2 < 10 &&
              player.gameboard.grid[x + 2][y] === undefined &&
              x + 3 < 10 &&
              player.gameboard.grid[x + 3][y] === undefined
            ) {
              createShipDiv(ship, rows, cols, x, y, rotate, player, isClicked);
            }
          } else {
            if (
              y + 1 < 10 &&
              player.gameboard.grid[x][y + 1] === undefined &&
              y + 2 < 10 &&
              player.gameboard.grid[x][y + 2] === undefined &&
              y + 3 < 10 &&
              player.gameboard.grid[x][y + 3] === undefined
            ) {
              createShipDiv(ship, rows, cols, x, y, rotate, player, isClicked);
            }
          }
        } else if (ship.type === STR_CRUISER) {
          if (rotate) {
            if (
              x + 1 < 10 &&
              player.gameboard.grid[x + 1][y] === undefined &&
              x + 2 < 10 &&
              player.gameboard.grid[x + 2][y] === undefined
            ) {
              createShipDiv(ship, rows, cols, x, y, rotate, player, isClicked);
            }
          } else {
            if (
              y + 1 < 10 &&
              player.gameboard.grid[x][y + 1] === undefined &&
              y + 2 < 10 &&
              player.gameboard.grid[x][y + 2] === undefined
            ) {
              createShipDiv(ship, rows, cols, x, y, rotate, player, isClicked);
            }
          }
        } else if (ship.type === STR_SUBMARINE) {
          if (rotate) {
            if (
              x + 1 < 10 &&
              player.gameboard.grid[x + 1][y] === undefined &&
              x + 2 < 10 &&
              player.gameboard.grid[x + 2][y] === undefined
            ) {
              createShipDiv(ship, rows, cols, x, y, rotate, player, isClicked);
            }
          } else {
            if (
              y + 1 < 10 &&
              player.gameboard.grid[x][y + 1] === undefined &&
              y + 2 < 10 &&
              player.gameboard.grid[x][y + 2] === undefined
            ) {
              createShipDiv(ship, rows, cols, x, y, rotate, player, isClicked);
            }
          }
        } else if (ship.type === STR_DESTROYER) {
          if (rotate) {
            if (x + 1 < 10 && player.gameboard.grid[x + 1][y] === undefined) {
              createShipDiv(ship, rows, cols, x, y, rotate, player, isClicked);
            }
          } else {
            if (y + 1 < 10 && player.gameboard.grid[x][y + 1] === undefined) {
              createShipDiv(ship, rows, cols, x, y, rotate, player, isClicked);
            }
          }
        }
      }
    }
  };

  const generateGameboardComponent = (element) => {
    for (let i = 0; i < 10; i++) {
      const rowDivCreated = document.createElement("div");
      rowDivCreated.classList.add("row");
      rowDivCreated.dataset.position = i;
      element.appendChild(rowDivCreated);
      for (let j = 0; j < 10; j++) {
        const colDivCreated = document.createElement("div");
        colDivCreated.classList.add("col");
        colDivCreated.dataset.position = j;
        rowDivCreated.appendChild(colDivCreated);
      }
    }

    mainCreated.appendChild(element);
  };

  generateGameboardComponent(playerGameboardDivCreated);

  const colsSelected = document.querySelectorAll(".col");

  const reset = function () {
    mainCreated.innerHTML = "";
    rotateButtonCreated.removeEventListener("click", playClick);
    rotateButtonCreated.textContent = "Rotate";
    if (resetButtonCreated.textContent === "New Game") {
      resetButtonCreated.textContent = "Reset";
    }
    buttonsContainerCreated.innerHTML = "";
    init();
    this.removeEventListener("click", reset);
  };

  const rotateShips = () => {
    rotate = !rotate;
  };

  const placeNextShip = function (e) {
    if (e.target !== this && !e.target.classList.contains("row")) {
      placeShipPositionOnGrid(player, rotate, e.target, true);
    }
  };

  const showShip = function (e) {
    removeShipIfPositionChanged(e.target);
    placeShipPositionOnGrid(player, rotate, e.target);
  };

  const hideShip = function () {
    removeShipIfPositionChanged();
  };

  const playClick = () => {
    generateGameboardComponent(computerGameboardDivCreated);
    rotateButtonCreated.removeEventListener("click", playClick);

    if (rotateButtonCreated.textContent === "Play") {
      rotateButtonCreated.remove();
      resetButtonCreated.textContent = "New Game";
    }
  };

  const removeEvents = () => {
    if (count === 5) {
      rotateButtonCreated.removeEventListener("click", rotateShips);
      rotateButtonCreated.textContent = "Play";
      rotateButtonCreated.addEventListener("click", playClick);
      playerGameboardDivCreated.removeEventListener("click", placeNextShip);
      colsSelected.forEach((col) => {
        col.removeEventListener("pointerenter", showShip);
        col.removeEventListener("pointerleave", hideShip);
      });
      document.removeEventListener("click", removeEvents);
    }
  };

  const test = function (e) {
    if (
      e.target !== this &&
      !e.target.classList.contains("row") &&
      !e.target.classList.contains("miss") &&
      !e.target.classList.contains("hit")
    ) {
      const col = e.target;
      const row = e.target.parentElement;
      const rows = computerGameboardDivCreated.children;
      const x = Number(row.dataset.position);
      const y = Number(col.dataset.position);
      let xRandom = 0;
      let yRandom = 0;

      const randomAttack = () => {
        do {
          xRandom = Math.round(Math.random() * 9);
          yRandom = Math.round(Math.random() * 9);
        } while (
          player.gameboard.grid[xRandom][yRandom] === "miss" ||
          player.gameboard.grid[xRandom][yRandom] === "hit"
        );

        computer.attackEnemy(
          player,
          xRandom,
          yRandom,
          playerGameboardDivCreated.children
        );
      };

      if (
        player.gameboard.areAllShipsDestroyed() ||
        computer.gameboard.areAllShipsDestroyed()
      ) {
        computerGameboardDivCreated.removeEventListener("click", test);
        resetButtonCreated.style.backgroundColor =
          "var(--color-caribbean-green-l44)";
        resetButtonCreated.textContent = "Play Again?";
      }

      if (turn === true) {
        player.attackEnemy(computer, x, y, rows);
      }

      if (turn === false) {
        if (typeof xLast === "number" && typeof yLast === "number") {
          if (
            !(
              player.gameboard.grid[xLast - 1 >= 0 ? xLast - 1 : xLast][
                yLast
              ] === undefined ||
              player.gameboard.grid[xLast - 1 >= 0 ? xLast - 1 : xLast][
                yLast
              ] === "miss" ||
              player.gameboard.grid[xLast - 1 >= 0 ? xLast - 1 : xLast][
                yLast
              ] === "hit"
            )
          ) {
            computer.attackEnemy(
              player,
              xLast - 1 >= 0 ? xLast - 1 : xLast,
              yLast,
              playerGameboardDivCreated.children
            );
          } else if (
            !(
              player.gameboard.grid[xLast + 1 <= 9 ? xLast + 1 : xLast][
                yLast
              ] === undefined ||
              player.gameboard.grid[xLast + 1 <= 9 ? xLast + 1 : xLast][
                yLast
              ] === "miss" ||
              player.gameboard.grid[xLast + 1 <= 9 ? xLast + 1 : xLast][
                yLast
              ] === "hit"
            )
          ) {
            computer.attackEnemy(
              player,
              xLast + 1 <= 9 ? xLast + 1 : xLast,
              yLast,
              playerGameboardDivCreated.children
            );
          } else if (
            !(
              player.gameboard.grid[xLast][
                yLast - 1 >= 0 ? yLast - 1 : yLast
              ] === undefined ||
              player.gameboard.grid[xLast][
                yLast - 1 >= 0 ? yLast - 1 : yLast
              ] === "miss" ||
              player.gameboard.grid[xLast][
                yLast - 1 >= 0 ? yLast - 1 : yLast
              ] === "hit"
            )
          ) {
            computer.attackEnemy(
              player,
              xLast,
              yLast - 1 >= 0 ? yLast - 1 : yLast,
              playerGameboardDivCreated.children
            );
          } else if (
            !(
              player.gameboard.grid[xLast][
                yLast + 1 <= 9 ? yLast + 1 : yLast
              ] === undefined ||
              player.gameboard.grid[xLast][
                yLast + 1 <= 9 ? yLast + 1 : yLast
              ] === "miss" ||
              player.gameboard.grid[xLast][
                yLast + 1 <= 9 ? yLast + 1 : yLast
              ] === "hit"
            )
          ) {
            computer.attackEnemy(
              player,
              xLast,
              yLast + 1 <= 9 ? yLast + 1 : yLast,
              playerGameboardDivCreated.children
            );
          } else {
            randomAttack();
          }
        } else {
          randomAttack();
        }
      }
    }
  };

  resetButtonCreated.addEventListener("click", reset);
  rotateButtonCreated.addEventListener("click", rotateShips);
  playerGameboardDivCreated.addEventListener("click", placeNextShip);
  computerGameboardDivCreated.addEventListener("click", test);
  colsSelected.forEach((col) => {
    col.addEventListener("pointerenter", showShip);
    col.addEventListener("pointerleave", hideShip);
  });
  document.addEventListener("click", removeEvents);
};

init();

export {
  Ship,
  Gameboard,
  Player,
  STR_CARRIER,
  STR_BATTLESHIP,
  STR_CRUISER,
  STR_SUBMARINE,
  STR_DESTROYER,
  changeTurn,
};

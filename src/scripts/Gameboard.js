import {
  STR_CARRIER,
  STR_BATTLESHIP,
  STR_CRUISER,
  STR_SUBMARINE,
  STR_DESTROYER,
  changeTurn,
} from "./App";
import Ship from "./Ship";
import "../styles/Gameboard.css";

let xLast;
let yLast;

const protoGameboard = {
  placeShips(ship, x, y, rotate) {
    let horizontal = x;
    let vertical = y;

    const addShip = () => {
      for (let i = 0; i < ship.length; i++) {
        if (rotate) {
          if (x + ship.length <= 10) {
            this.grid[horizontal][vertical] = ship.type;
            ship.position.y[0] = vertical;
            ship.position.x.push(horizontal);
            horizontal++;
          }
        } else {
          if (y + ship.length <= 10) {
            this.grid[horizontal][vertical] = ship.type;
            ship.position.x[0] = horizontal;
            ship.position.y.push(vertical);
            vertical++;
          }
        }
      }
    };

    if (ship.type === STR_CARRIER) {
      if (rotate) {
        if (
          x + ship.length <= 10 &&
          this.grid[x][y] === undefined &&
          this.grid[x + 1][y] === undefined &&
          this.grid[x + 2][y] === undefined &&
          this.grid[x + 3][y] === undefined &&
          this.grid[x + 4][y] === undefined
        ) {
          addShip();
        }
      } else {
        if (
          y + ship.length <= 10 &&
          this.grid[x][y] === undefined &&
          this.grid[x][y + 1] === undefined &&
          this.grid[x][y + 2] === undefined &&
          this.grid[x][y + 3] === undefined &&
          this.grid[x][y + 4] === undefined
        ) {
          addShip();
        }
      }
    } else if (ship.type === STR_BATTLESHIP) {
      if (rotate) {
        if (
          x + ship.length <= 10 &&
          this.grid[x][y] === undefined &&
          this.grid[x + 1][y] === undefined &&
          this.grid[x + 2][y] === undefined &&
          this.grid[x + 3][y] === undefined
        ) {
          addShip();
        }
      } else {
        if (
          y + ship.length <= 10 &&
          this.grid[x][y] === undefined &&
          this.grid[x][y + 1] === undefined &&
          this.grid[x][y + 2] === undefined &&
          this.grid[x][y + 3] === undefined
        ) {
          addShip();
        }
      }
    } else if (ship.type === STR_CRUISER) {
      if (rotate) {
        if (
          x + ship.length <= 10 &&
          this.grid[x][y] === undefined &&
          this.grid[x + 1][y] === undefined &&
          this.grid[x + 2][y] === undefined
        ) {
          addShip();
        }
      } else {
        if (
          y + ship.length <= 10 &&
          this.grid[x][y] === undefined &&
          this.grid[x][y + 1] === undefined &&
          this.grid[x][y + 2] === undefined
        ) {
          addShip();
        }
      }
    } else if (ship.type === STR_SUBMARINE) {
      if (rotate) {
        if (
          x + ship.length <= 10 &&
          this.grid[x][y] === undefined &&
          this.grid[x + 1][y] === undefined &&
          this.grid[x + 2][y] === undefined
        ) {
          addShip();
        }
      } else {
        if (
          y + ship.length <= 10 &&
          this.grid[x][y] === undefined &&
          this.grid[x][y + 1] === undefined &&
          this.grid[x][y + 2] === undefined
        ) {
          addShip();
        }
      }
    } else if (ship.type === STR_DESTROYER) {
      if (rotate) {
        if (
          x + ship.length <= 10 &&
          this.grid[x][y] === undefined &&
          this.grid[x + 1][y] === undefined
        ) {
          addShip();
        }
      } else {
        if (
          y + ship.length <= 10 &&
          this.grid[x][y] === undefined &&
          this.grid[x][y + 1] === undefined
        ) {
          addShip();
        }
      }
    }
  },
  receiveAttack(x, y, opponent, rows) {
    const hitCreated = document.createElement("div");
    const missCreated = document.createElement("div");

    window.requestAnimationFrame(() => {
      hitCreated.classList.add("hit");
      missCreated.classList.add("miss");
    });

    if (this.destroyedShipsCounter !== 5) {
      if (
        this.grid[x][y] !== undefined &&
        this.grid[x][y] !== "miss" &&
        this.grid[x][y] !== "hit"
      ) {
        if (rows[x].parentElement.classList.contains("player-board")) {
          xLast = x;
          yLast = y;
        }

        if (rows[x].children[y].children.length === 0) {
          rows[x].children[y].appendChild(hitCreated);
        } else if (
          rows[x].children[y].children[0].classList.contains("ship") &&
          !rows[x].children[y].children[0].hasChildNodes()
        ) {
          rows[x].children[y].children[0].appendChild(hitCreated);
        }
        changeTurn();
        this.warships[this.grid[x][y]].hit(x, y);
        this.warships[this.grid[x][y]].isSunk();
        if (this.warships[this.grid[x][y]].destroyed) {
          this.destroyedShipsCounter++;
        }
        this.grid[x][y] = "hit";
      } else {
        if (rows[x].children[y].children.length === 0) {
          rows[x].children[y].appendChild(missCreated);
          changeTurn();
          this.grid[x][y] = "miss";
          opponent.gameboard.missed++;
        }
      }
    }
  },
  areAllShipsDestroyed() {
    return this.destroyedShipsCounter === 5 ? true : false;
  },
};

const Gameboard = () => {
  const gameboard = Object.create(protoGameboard);

  gameboard.grid = [];
  gameboard.warships = {
    carrier: Ship("carrier", 5),
    battleship: Ship("battleship", 4),
    cruiser: Ship("cruiser", 3),
    submarine: Ship("submarine", 3),
    destroyer: Ship("destroyer", 2),
  };

  gameboard.destroyedShipsCounter = 0;
  gameboard.missed = 0;

  while (gameboard.grid.length < 10) {
    gameboard.grid.push(new Array(10));
  }

  return gameboard;
};

export { Gameboard, xLast, yLast };

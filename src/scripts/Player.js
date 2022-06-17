import { Gameboard } from "./Gameboard";

const protoPlayer = {
  attackEnemy(enemy, x, y, target) {
    enemy.gameboard.receiveAttack(x, y, this, target);
  },
  generateRandomBoard() {
    if (this.isComputer) {
      for (const shipType in this.gameboard.warships) {
        const ship = this.gameboard.warships[shipType];
        while (
          this.gameboard.warships[ship.type].position.x.length <= 0 &&
          this.gameboard.warships[ship.type].position.y.length <= 0
        ) {
          const x = Math.round(Math.random() * 9);
          const y = Math.round(Math.random() * 9);
          let randomBoolean = Math.random() < 0.5;

          this.gameboard.placeShips(ship, x, y, randomBoolean);
        }
      }
    } else {
      return;
    }
  },
};

const Player = (isComputer = false) => {
  const player = Object.create(protoPlayer);
  player.gameboard = Gameboard();
  player.isComputer = isComputer;

  return player;
};

export default Player;

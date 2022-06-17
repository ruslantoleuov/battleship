const protoShip = {
  hit(x, y) {
    if (this.position.x.length !== 1) {
      this.position.x[this.position.x.indexOf(x)] = "hit";
    } else {
      this.position.y[this.position.y.indexOf(y)] = "hit";
    }
  },
  isSunk() {
    if (
      this.position.x.length !== 1
        ? this.position.x.filter((el) => el === "hit").length === this.length
        : this.position.y.filter((el) => el === "hit").length === this.length
    ) {
      this.destroyed = true;
    }
  },
};

const Ship = (type, length) => {
  const ship = Object.create(protoShip);

  ship.type = type;
  ship.length = length;
  ship.position = {
    x: [],
    y: [],
  };
  ship.destroyed = false;

  return ship;
};

export default Ship;

import { Ship, Gameboard, Player } from "../scripts/App";

test("should contain property grid with multidimensional array", () => {
  const player = Player();

  return expect(
    player.gameboard.grid.length === 10 &&
      player.gameboard.grid.every((arr) => arr.length === 10)
  ).toBe(true);
});

test("player should have property isComputer with value false", () => {
  const player = Player();

  return expect(player.isComputer).toBe(false);
});

test("computer should have property isComputer with value true", () => {
  const computer = Player(true);

  return expect(computer.isComputer).toBe(true);
});

test("carrier length should be 5", () => {
  const player = Player();

  return expect(player.gameboard.warships.carrier.length).toBe(5);
});

test("carrier type should be carrier", () => {
  const player = Player();

  return expect(player.gameboard.warships.carrier.type).toBe("carrier");
});

test("battleship length should be 4", () => {
  const player = Player();

  return expect(player.gameboard.warships.battleship.length).toBe(4);
});

test("battleship type should be battleship", () => {
  const player = Player();

  return expect(player.gameboard.warships.battleship.type).toBe("battleship");
});

test("cruiser length should be 3", () => {
  const player = Player();

  return expect(player.gameboard.warships.cruiser.length).toBe(3);
});

test("cruiser type should be cruiser", () => {
  const player = Player();

  return expect(player.gameboard.warships.cruiser.type).toBe("cruiser");
});

test("submarine length should be 3", () => {
  const player = Player();

  return expect(player.gameboard.warships.submarine.length).toBe(3);
});

test("submarine type should be submarine", () => {
  const player = Player();

  return expect(player.gameboard.warships.submarine.type).toBe("submarine");
});

test("destroyer length should be 2", () => {
  const player = Player();

  return expect(player.gameboard.warships.destroyer.length).toBe(2);
});

test("destroyer type should be destroyer", () => {
  const player = Player();

  return expect(player.gameboard.warships.destroyer.type).toBe("destroyer");
});

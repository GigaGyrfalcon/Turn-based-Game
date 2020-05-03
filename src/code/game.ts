import isEqual from 'lodash.isequal';

import {
  Coordinates,
  Direction,
  Action,
  ActionType,
  ActionResponse,
  SoldierInterface,
} from './interfaces';

export function getRandomCoordinates(size: number): Coordinates {
  const coordinates = {
    x: Math.floor(size * Math.random()),
    y: Math.floor(size * Math.random()),
    mapSize: size,
  };
  return coordinates;
}

export const moveForward = (coordinates: Coordinates) => ({
  ...coordinates,
  x: checkValidity(coordinates.x, coordinates.x - 1, coordinates.mapSize),
});
export const moveBack = (coordinates: Coordinates) => ({
  ...coordinates,
  x: checkValidity(coordinates.x, coordinates.x + 1, coordinates.mapSize),
});
export const moveRight = (coordinates: Coordinates) => ({
  ...coordinates,
  y: checkValidity(coordinates.y, coordinates.y + 1, coordinates.mapSize),
});
export const moveLeft = (coordinates: Coordinates) => ({
  ...coordinates,
  y: checkValidity(coordinates.y, coordinates.y - 1, coordinates.mapSize),
});

function compareCoordinates(
  shooter: SoldierInterface,
  target: SoldierInterface,
  distance: number,
  param: 'x' | 'y'
) {
  let shooterCoordinates = shooter.coordinates;
  let got = false;
  for (let i = 0; i <= distance; i++) {
    if (isEqual(shooterCoordinates, target.coordinates)) {
      got = true;
      break;
    }
    shooterCoordinates = {
      ...shooterCoordinates,
      [param]: shooterCoordinates[param] - 1,
    };
  }
  return got;
}

function checkTarget(
  shooter: SoldierInterface,
  target: SoldierInterface,
  distance: number
) {
  if (shooter.aim === Direction.Up) {
    if (shooter.coordinates.y !== target.coordinates.y) return false;
    return compareCoordinates(shooter, target, distance, 'x');
  }
  if (shooter.aim === Direction.Down) {
    if (shooter.coordinates.y !== target.coordinates.y) return false;
    return compareCoordinates(target, shooter, distance, 'x');
  }
  if (shooter.aim === Direction.Left) {
    if (shooter.coordinates.x !== target.coordinates.x) return false;
    return compareCoordinates(shooter, target, distance, 'y');
  }
  if (shooter.aim === Direction.Right) {
    if (shooter.coordinates.x !== target.coordinates.x) return false;
    return compareCoordinates(target, shooter, distance, 'y');
  }
  return true;
}

export function shootPistol(
  shooter: SoldierInterface,
  target: SoldierInterface
) {
  const result = checkTarget(shooter, target, 4);
  if (result) {
    target.health -= 10;
  }
  if (target.health <= 0) {
    alert('Game over');
  }
  return true;
}
export function shootSniper(
  shooter: SoldierInterface,
  target: SoldierInterface
) {
  const result = checkTarget(shooter, target, 2);
  if (result) {
    target.health -= 5;
  }
  if (target.health <= 0) {
    alert('Game over');
  }
  return true;
}

function checkValidity(oldValue: number, newValue: number, size: number) {
  if (newValue >= size || newValue < 0) {
    return oldValue;
  }
  return newValue;
}

export function handlerAction(
  event: KeyboardEvent,
  shooter: SoldierInterface,
  target: SoldierInterface
): ActionResponse {
  switch (event.code) {
    case Action.FORWARD:
      return {
        type: ActionType.MOVED,
        aim: Direction.Up,
        payload: moveForward(shooter.coordinates),
      };
    case Action.BACK:
      return {
        type: ActionType.MOVED,
        aim: Direction.Down,
        payload: moveBack(shooter.coordinates),
      };
    case Action.RIGHT:
      return {
        type: ActionType.MOVED,
        aim: Direction.Right,
        payload: moveRight(shooter.coordinates),
      };
    case Action.LEFT:
      return {
        type: ActionType.MOVED,
        aim: Direction.Left,
        payload: moveLeft(shooter.coordinates),
      };
    case Action.SHOOT_PISTOL:
      return {
        type: ActionType.SHOT,
        shot: shootPistol(shooter, target),
      };
    case Action.SHOOT_SNIPER:
      return {
        type: ActionType.SHOT,
        shot: shootSniper(shooter, target),
      };
    default:
      return { type: ActionType.INVALID };
  }
}

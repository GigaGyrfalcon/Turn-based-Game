export enum Action {
  FORWARD = 'ArrowUp',
  BACK = 'ArrowDown',
  RIGHT = 'ArrowRight',
  LEFT = 'ArrowLeft',
  SHOOT_SNIPER = 'KeyA',
  SHOOT_PISTOL = 'KeyZ',
}

export enum ActionType {
  INVALID = 0,
  MOVED = 1,
  SHOT = 2,
}

export enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

export enum BlockState {
  Passive = 'passive',
  Active = 'active',
  Home = 'home',
  Away = 'away',
}

export interface ActionResponse {
  type: ActionType;
  payload?: Coordinates;
  shot?: boolean;
  aim?: Direction;
}

export interface PlayerInterface {
  name: string;
  soldier: SoldierInterface;
}

export interface BlockProps {
  place?: string;
}

export interface AccountProps {
  classes: string;
  player: PlayerInterface;
}

export interface Coordinates {
  x: number;
  y: number;
  mapSize: number;
}

export interface Arm {
  type: string;
  distance: number;
  damage: number;
}

export interface SoldierInterface {
  health: number;
  weapons: Arm[];
  aim: Direction;
  coordinates: Coordinates;
  shoot: () => boolean;
  damage: (damage: number) => boolean;
  updateAim: (aim: Direction) => void;
  updateCoordinates: (coordinates: Coordinates) => void;
}

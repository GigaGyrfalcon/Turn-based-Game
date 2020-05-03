import { SoldierInterface, Arm, Coordinates, Direction } from './interfaces';
import { Sniper, Pistol } from './weapon';

export class Soldier implements SoldierInterface {
  health: number = 100;
  weapons: Arm[];
  aim: Direction;
  constructor(public coordinates: Coordinates) {
    this.weapons = [new Pistol(), new Sniper()];
    this.aim = Direction.Left;
  }
  updateCoordinates(coordinates: Coordinates) {
    this.coordinates = coordinates;
  }
  updateAim(aim: Direction) {
    this.aim = aim;
  }
  shoot(): boolean {
    return true;
  }
  damage(damage: number): boolean {
    return (this.health -= damage) > 0;
  }
}

import { PlayerInterface, SoldierInterface, Coordinates } from './interfaces';
import { Soldier } from './soldier';

export class Player implements PlayerInterface {
  soldier: SoldierInterface;
  constructor(public name: string, public coordinates: Coordinates) {
    this.soldier = new Soldier(this.coordinates);
  }
}

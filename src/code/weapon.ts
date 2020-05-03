import { Arm } from './interfaces';

export class Weapon implements Arm {
  distance: number = 0;
  damage: number = 0;
  constructor(public type: string) {}
}

export class Pistol extends Weapon {
  constructor() {
    super('Pistol');
    this.distance = 2;
    this.damage = 5;
  }
}
export class Sniper extends Weapon {
  constructor() {
    super('Sniper');
    this.distance = 4;
    this.damage = 10;
  }
}

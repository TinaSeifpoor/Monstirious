import { Injectable } from "@angular/core";

import { map, take } from "rxjs/operators";
import { PlayerService, Card } from "./player.service";
import { MonsterService } from "./monster.service";
import { MonsterHit } from "./Cards/Interfaces";

@Injectable({
  providedIn: "root"
})
export class MonsteraiService {
  public haveEnoughMonsterMana = false;
  public card: Card = MonsterHit;
  public playerCurrentHealth : number;
  public monsterCurrentHealth : number;

  constructor(
    private PlayerService: PlayerService,
    private MonsterService: MonsterService
  ) {

    const myFunctionOnCallback1 = (Health: number) => {
      this.playerCurrentHealth = Health;
    };
    this.PlayerService.health$.subscribe(myFunctionOnCallback1);

    const myFunctionOnCallback2 = (Health: number) => {
      this.monsterCurrentHealth = Health;
    };
    this.MonsterService.monsterhealth$.subscribe(myFunctionOnCallback2);

    const myFunctionOnCallback = (currentlyMonsterHaveEnoughMana: boolean) => {
      if(currentlyMonsterHaveEnoughMana===true && this.playerCurrentHealth > 0 && this.monsterCurrentHealth > 0) {
      console.log(currentlyMonsterHaveEnoughMana);
      this.MonsterService.addMonsterHistory(this.card.name);
      this.card.playCard(
        mana => this.PlayerService.changeMana(mana),
        health => this.PlayerService.changeHealth(health),
        mana => this.MonsterService.changeMonsterMana(mana),
        health => this.MonsterService.changeMonsterHealth(health)
      );
    }
    };
    const myFunctionToCheckMana = (currentMonsterMana: number): boolean => {
      return currentMonsterMana > this.card.manaCost;
    };
    this.MonsterService.monstermana$
      .pipe(map(myFunctionToCheckMana))
      .subscribe(myFunctionOnCallback);
  }
}

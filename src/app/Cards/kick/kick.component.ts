import { Component, OnInit } from "@angular/core";

import { map } from "rxjs/operators";
import { PlayerService } from "../../player.service";
import { MonsterService } from "../../monster.service";
import { Card, CardType } from "../../player.service";
import { Kick } from "../Interfaces";


@Component({
  selector: "card-kick",
  templateUrl: "./kick.component.html",
  styleUrls: ["./kick.component.css"]
})
export class KickComponent implements OnInit {
  
  public haveEnoughMana = false;
  public myCard: Card = Kick;

  constructor(
    private PlayerService: PlayerService,
    private MonsterService: MonsterService
  ) {}

  ngOnInit() {
    const myFunctionOnCallback = (currentlyHaveEnoughMana: boolean) => {
      this.haveEnoughMana = currentlyHaveEnoughMana;
    };

    const myFunctionToCheckMana = (currentMana: number): boolean => {
      return currentMana > this.myCard.manaCost;
    };

    this.PlayerService.mana$
      .pipe(map(myFunctionToCheckMana))
      .subscribe(myFunctionOnCallback);
  }

  public onClick(): void {
    this.PlayerService.addPlayerHistory(this.myCard);
    this.myCard.playCard(
      mana => this.PlayerService.changeMana(mana),
      health => this.PlayerService.changeHealth(health),
      mana => this.MonsterService.changeMonsterMana(mana),
      health => this.MonsterService.changeMonsterHealth(health)
    );
  }
}

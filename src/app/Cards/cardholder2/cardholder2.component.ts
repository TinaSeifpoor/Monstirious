import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

import { map } from "rxjs/operators";
import { PlayerService } from "../../player.service";
import { MonsterService } from "../../monster.service";
import { Card } from "../../player.service";

@Component({
  selector: "cardholder",
  templateUrl: "./cardholder2.component.html",
  styleUrls: ["./cardholder2.component.css"]
})
export class KickComponent implements OnInit {
  public haveEnoughMana = false;
  public haveEnoughHealth = false;
  public clickAvailable = false;
 
  private numberOfPlays = 0;
  @Input() public card: Card;
  @Output() public onplay = new EventEmitter<number>();

  constructor(
    private PlayerService: PlayerService,
    private MonsterService: MonsterService
  ) {}

  ngOnInit() {
    const myFunctionOnCallback = (currentlyHaveEnoughMana: boolean) => {
      this.haveEnoughMana = currentlyHaveEnoughMana;
      this.clickAvailable = this.haveEnoughMana && this.haveEnoughHealth;
    };

    const myFunctionToCheckMana = (currentMana: number): boolean => {
      return currentMana > this.card.manaCost;
    };

    this.PlayerService.mana$
      .pipe(map(myFunctionToCheckMana))
      .subscribe(myFunctionOnCallback);

    const myFunctionOnCallback2 = (currentlyHaveEnoughHealth: boolean) => {
      this.haveEnoughHealth = currentlyHaveEnoughHealth;
      this.clickAvailable = this.haveEnoughMana && this.haveEnoughHealth;
    };

    const myFunctionToCheckHealth = (currentHealth: number): boolean => {
      console.log("function2");
  
      return currentHealth > 0;
    };

    this.PlayerService.health$
      .pipe(map(myFunctionToCheckHealth))
      .subscribe(myFunctionOnCallback2);
 
  }

  public onClick(): void {
    this.PlayerService.addPlayerHistory(this.card);
    this.card.playCard(
      mana => this.PlayerService.changeMana(mana),
      health => this.PlayerService.changeHealth(health),
      mana => this.MonsterService.changeMonsterMana(mana),
      health => this.MonsterService.changeMonsterHealth(health)
    );
    this.numberOfPlays += 1;
    this.onplay.emit(this.numberOfPlays);
  }
}

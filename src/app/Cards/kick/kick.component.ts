import { Component, OnInit } from '@angular/core';

import { map } from "rxjs/operators";
import { PlayerService } from "../../player.service";
import { MonsterService } from '../../monster.service';

@Component({
  selector: 'card-kick',
  templateUrl: './kick.component.html',
  styleUrls: ['./kick.component.css']
})
export class KickComponent implements OnInit {

  public haveEnoughMana = false;
  public manaCost = 30;
  public damage = 30;
  constructor(private PlayerService: PlayerService,
    private MonsterService: MonsterService) {}

  ngOnInit() {
    const myFunctionOnCallback = (currentlyHaveEnoughMana: boolean) => {
      this.haveEnoughMana = currentlyHaveEnoughMana;
    };

    const myFunctionToCheckMana = (currentMana: number) : boolean => {
      return currentMana > this.manaCost;
    };

    this.PlayerService.mana$
      .pipe(map(myFunctionToCheckMana))
      .subscribe(myFunctionOnCallback);
  }

  public onClick(): void {
    console.log("Kick button clicked");
    this.PlayerService.addPlayerHistory('Kick');
    this.PlayerService.changeMana(-this.manaCost);
    this.MonsterService.changeMonsterHealth(-this.damage)
  }
}

import { Component, OnInit } from '@angular/core';

import { map } from "rxjs/operators";
import { PlayerService } from "../../player.service";
import { MonsterService } from '../../monster.service';

@Component({
  selector: 'card-dikshua',
  templateUrl: './dikshua.component.html',
  styleUrls: ['./dikshua.component.css']
})
export class DikshuaComponent implements OnInit {

  public haveEnoughMana = false;
  public manaCost = 50;
  public damage = 50;
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
    console.log("Dikshua button clicked");
    this.PlayerService.addPlayerHistory('Dikshua');
    this.PlayerService.changeMana(-this.manaCost);
    this.MonsterService.changeMonsterHealth(-this.damage)
  }
}
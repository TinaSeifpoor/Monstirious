import { Component, OnInit } from '@angular/core';

import { map } from "rxjs/operators";
import { PlayerService } from "../../player.service";

@Component({
  selector: 'card-superpunch',
  templateUrl: './superpunch.component.html',
  styleUrls: ['./superpunch.component.css']
})
export class SuperpunchComponent implements OnInit {

  public haveEnoughMana = false;
  public manaCost = 20;
  constructor(private PlayerService: PlayerService) {}

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
    console.log("Punch button clicked");
    this.PlayerService.addPlayerHistory('punch');
    this.PlayerService.changeMana(-this.manaCost);
  }
}

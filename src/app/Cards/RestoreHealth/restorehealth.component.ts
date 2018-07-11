import { Component, OnInit } from "@angular/core";

import { map } from "rxjs/operators";
import { PlayerService } from "../../player.service";
@Component({
  selector: "card-restorehealth",
  templateUrl: "./restorehealth.component.html",
  styleUrls: ["./restorehealth.component.css"]
})
export class RestoreHealthComponent implements OnInit {
  public haveEnoughMana = false;
  public manaCost = 10;
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
    console.log("Restore button clicked");
    this.PlayerService.addPlayerHistory('HealthRestore');
    this.PlayerService.changeHealth(+10);
    this.PlayerService.changeMana(-this.manaCost);
  }
}
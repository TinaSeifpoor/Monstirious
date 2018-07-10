import { Component, OnInit } from "@angular/core";

import { map } from "rxjs/operators";
import { HealthPointService } from "../../healthpoint.service";
@Component({
  selector: "card-restorehealth",
  templateUrl: "./restorehealth.component.html",
  styleUrls: ["./restorehealth.component.css"]
})
export class RestoreHealthComponent implements OnInit {
  public haveEnoughMana = false;
  public manaCost = 10;
  constructor(private healthPointService: HealthPointService) {}

  ngOnInit() {
    const myFunctionOnCallback = (currentlyHaveEnoughMana: boolean) => {
      this.haveEnoughMana = currentlyHaveEnoughMana;
    };

    const myFunctionToCheckMana = (currentMana: number) : boolean => {
      return currentMana > this.manaCost;
    };

    this.healthPointService.mana$
      .pipe(map(myFunctionToCheckMana))
      .subscribe(myFunctionOnCallback);
  }

  public onClick(): void {
    console.log("Restore button clicked");
    this.healthPointService.addPlayerHistory('HealthRestore');
    this.healthPointService.changeHealth(+10);
    this.healthPointService.changeMana(-this.manaCost);
  }
}

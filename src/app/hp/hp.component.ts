import { Component, OnInit } from "@angular/core";
import { PlayerService } from "../player.service";

@Component({
  selector: "app-hp",
  templateUrl: "./hp.component.html",
  styleUrls: ["./hp.component.css"]
})
export class HPComponent implements OnInit {
  public hp: number; // Sets the number on the component
  constructor(private PlayerService: PlayerService) {}

  public ngOnInit(): void {
    const myFunctionOnCallback = (currentHealthValue: number) => {
      this.hp = currentHealthValue;

    };

    this.PlayerService.health$.subscribe(myFunctionOnCallback);

    // setInterval(() => {
    //   this.PlayerService.changeHealth(-5);
    // }, 300);
  }
}

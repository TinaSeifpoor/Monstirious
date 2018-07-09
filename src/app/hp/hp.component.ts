import { Component, OnInit } from "@angular/core";
import { HealthPointService } from "../healthpoint.service";

@Component({
  selector: "app-hp",
  templateUrl: "./hp.component.html",
  styleUrls: ["./hp.component.css"]
})
export class HPComponent implements OnInit {
  public hp: number; // Sets the number on the component
  constructor(private healthPointService: HealthPointService) {}

  public ngOnInit(): void {
    const myFunctionOnCallback = (currentHealthValue: number) => {
      this.hp = currentHealthValue;
    };

    this.healthPointService.health$.subscribe(myFunctionOnCallback);

    // setInterval(() => {
    //   this.healthPointService.changeHealth(-5);
    // }, 300);
  }
}

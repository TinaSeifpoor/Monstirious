import { Component, OnInit } from "@angular/core";
import { HealthPointService } from "../healthpoint.service";

@Component({
  selector: "app-mn",
  templateUrl: "./mn.component.html",
  styleUrls: ["./mn.component.css"]
})
export class MNComponent implements OnInit {
  public mn: number; // Sets the number on the component
  constructor(private healthPointService: HealthPointService) {}

  public ngOnInit(): void {
    const myFunctionOnCallback = (currentHealthValue: number) => {
      this.mn = currentHealthValue;
    };

    this.healthPointService.mana$.subscribe(myFunctionOnCallback);

    setInterval(() => {

    if (this.mn<100){
      this.healthPointService.changeMana(+1);}

    }, 300);
  }
}

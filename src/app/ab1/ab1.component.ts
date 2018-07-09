import { Component, OnInit } from "@angular/core";
import { HealthPointService } from "../healthpoint.service";

@Component({
  selector: "app-ab1",
  templateUrl: "./ab1.component.html",
  styleUrls: ["./ab1.component.css"]
})
export class AB1Component implements OnInit {
  constructor(private healthPointService: HealthPointService) {}

  ngOnInit() {}

  public onClick(): void {
    console.log('Restore button clicked');
    this.healthPointService.changeHealth(+10);
    this.healthPointService.changeMana(-10);
  }
}

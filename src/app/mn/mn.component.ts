import { Component, OnInit } from "@angular/core";
import { PlayerService } from "../player.service";
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';     
import {MatProgressBarModule} from '@angular/material/progress-bar';
            //api

@Component({
  selector: "app-mn",
  templateUrl: "./mn.component.html",
  styleUrls: ["./mn.component.css"]
})
export class MNComponent implements OnInit {
  public mn: number; // Sets the number on the component
  constructor(private PlayerService: PlayerService) {}

  public ngOnInit(): void {
    const myFunctionOnCallback = (currentHealthValue: number) => {
      this.mn = currentHealthValue;
    };

    this.PlayerService.mana$.subscribe(myFunctionOnCallback);

    // setInterval(() => {

    // if (this.mn<100){
    //   this.PlayerService.changeMana(+1);}

    // }, 300);
  }
}

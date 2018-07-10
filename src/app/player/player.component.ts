import { Component, OnInit } from '@angular/core';
import { HealthPointService } from '../healthpoint.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  public playerhistory: string[] = []; // Sets the number on the component
  constructor(private healthPointService: HealthPointService) {}

  public ngOnInit(): void {
    const myFunctionOnCallback = (currentPlayedCard: string) => {
      this.playerhistory.push(currentPlayedCard);
    };

    this.healthPointService.playerhistory$.subscribe(myFunctionOnCallback);

    // setInterval(() => {
    //   this.healthPointService.changeHealth(-5);
    // }, 300);
  }
}

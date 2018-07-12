import { Component, OnInit } from '@angular/core';
import { PlayerService, Card } from '../player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  public playerhistory: string[] = []; // Sets the number on the component
  constructor(private PlayerService: PlayerService) {}

  public ngOnInit(): void {
    const myFunctionOnCallback = (currentPlayedCard: Card) => {
      this.playerhistory.push(currentPlayedCard.name);
      console.log(this.playerhistory);
    };

    this.PlayerService.playerhistory$.subscribe(myFunctionOnCallback);

    // setInterval(() => {
    //   this.PlayerService.changeHealth(-5);
    // }, 300);
  }
}

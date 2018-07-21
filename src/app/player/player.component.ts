import { Component, OnInit } from "@angular/core";
import { PlayerService, Card } from "../player.service";
import { MonsterService } from "../monster.service";

const girlherosvgpath = "/assets/images/girlhero.svg";
const girlhero20svgpath = "/assets/images/girlherounder30.svg";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.css"]
})
export class PlayerComponent implements OnInit {
  public playerhistory: string[] = []; // Sets the number on the component
  public pathUrl: string;
  constructor(
    private PlayerService: PlayerService,
    private MonsterService: MonsterService
  ) {}

  public ngOnInit(): void {
    const myFunctionOnCallback = (currentPlayedCard: Card) => {
      this.playerhistory.push(currentPlayedCard.name);
      console.log(this.playerhistory);
    };

    const setPathFunction = playerHealthVariable => {
      if (playerHealthVariable > 20) {
        if (this.pathUrl !== girlherosvgpath) {
          this.pathUrl = girlherosvgpath;
        }
      } else if (playerHealthVariable <= 20) {
        if (this.pathUrl !== girlhero20svgpath) {
          this.pathUrl = girlhero20svgpath;
        }
      }
    };
    this.PlayerService.playerhistory$.subscribe(myFunctionOnCallback);
    this.PlayerService.health$.subscribe(setPathFunction);
    // setInterval(() => {
    //   this.PlayerService.changeHealth(-5);
    // }, 300);
  }
}

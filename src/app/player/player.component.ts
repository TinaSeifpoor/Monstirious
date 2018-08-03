import { Component, OnInit } from "@angular/core";
import { PlayerService, Card, CardType } from "../player.service";
import { MonsterService } from "../monster.service";
import { CharacterState } from "../breathandblink/breathandblink.component";

const girlherosvgpath = "/assets/images/HeroGirlNumber1/hg1Full.svg";
const girlhero20svgpath = "/assets/images/girlherounder30.svg";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.css"]
})
export class PlayerComponent implements OnInit {
  public playerhistory: string[] = []; // Sets the number on the component
  public pathUrl: string;
  public characterName: string = "HeroGirlNumber1";
  public characterState = CharacterState.Idle;
  constructor(
    private PlayerService: PlayerService,
    private MonsterService: MonsterService
  ) {}

  public ngOnInit(): void {
    const myFunctionOnCallback = (currentPlayedCard: Card) => {
      this.playerhistory.push(currentPlayedCard.name);
      if (
        currentPlayedCard.type == CardType.SingleTargetDamage ||
        currentPlayedCard.type == CardType.AreaDamage
      ) {
        this.characterState = CharacterState.Attacking;
      } else if (currentPlayedCard.type == CardType.SelfHealing) {
        this.characterState = CharacterState.Healing;
      }
      // Start animation
      // Finished animation
      setTimeout(() => {
        this.characterState = CharacterState.Idle;
      }, 1000);
      console.log(this.playerhistory);
    };

    const setPathFunction = playerHealthVariable => {
      if (playerHealthVariable > 30) {
        if (this.pathUrl !== girlherosvgpath) {
          this.pathUrl = girlherosvgpath;
        }
      } else if (playerHealthVariable <= 30) {
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

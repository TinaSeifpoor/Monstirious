import { Component, OnInit } from "@angular/core";
import { MonsterService } from "../monster.service";
import { PlayerService } from "../player.service";
import { MonsteraiService } from "../monsterai.service";

const monsterpath = "/assets/images/Monster1.svg";
const monsterunder30path = "/assets/images/Monster1under30.svg";

@Component({
  selector: "app-monster",
  templateUrl: "./monster.component.html",
  styleUrls: ["./monster.component.css"]
})
export class MonsterComponent implements OnInit {
  public monsterhistory: string[] = [];
  public monstermn: number;
  public monsterhp: number;
  public pathUrl2: string;

  constructor(
    private PlayerService: PlayerService,
    private MonsterService: MonsterService,
    private MonsterAIService: MonsteraiService,
  ) {}

  public ngOnInit(): void {

    const myFunctionOnCallback = (currentPlayedCard: string) => {
      this.monsterhistory.push(currentPlayedCard);
            console.log(this.monsterhistory);
    };
    this.MonsterService.monsterhistory$.subscribe(myFunctionOnCallback);

    const myFunctionOnCallback2 = (currentHealthValue: number) => {
      this.monsterhp = currentHealthValue;
    };
    this.MonsterService.monsterhealth$.subscribe(myFunctionOnCallback2);

    const myFunctionOnCallback3 = (currentHealthValue: number) => {
      this.monstermn = currentHealthValue;
    };

    const setPathFunction = playerHealthVariable => {
      if (playerHealthVariable > 30) {
        if (this.pathUrl2 !== monsterpath) {
          this.pathUrl2 = monsterpath;
        }
      } else if (playerHealthVariable <= 30) {
        if (this.pathUrl2 !== monsterunder30path) {
          this.pathUrl2 =  monsterunder30path;
        }
      }
    };
    this.MonsterService.monsterhealth$.subscribe(setPathFunction);
    this.MonsterService.monstermana$.subscribe(myFunctionOnCallback3);
  }
}

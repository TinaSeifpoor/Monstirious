import { Component, OnInit } from "@angular/core";
import { MonsterService } from "../monster.service";

@Component({
  selector: "app-monster",
  templateUrl: "./monster.component.html",
  styleUrls: ["./monster.component.css"]
})
export class MonsterComponent implements OnInit {
  public monsterhistory: string[] = [];
  public monstermn: number;
  public monsterhp: number;

  constructor(private MonsterService: MonsterService) {}

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

    this.MonsterService.monstermana$.subscribe(myFunctionOnCallback3);
  }
}

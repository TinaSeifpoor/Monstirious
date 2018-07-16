import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { StartsettingsService } from "./startsettings.service";

@Injectable({
  providedIn: "root"
})
export class MonsterService {
  constructor(private startSettingService: StartsettingsService ) {
    setInterval(() => {
      if (this.monstermanaSource.getValue() < 100 && this.monsterhealthSource.getValue() > 0) {
        this.changeMonsterMana(+5);
      }
    }, 500);
    const initiateMonsterHealth = (intialValue:number)=>{
      this.monsterhealthSource.next(intialValue);
         }
    this.startSettingService.startMonsterHealth$.subscribe(initiateMonsterHealth);
  }

  private monsterhealthSource: BehaviorSubject<number> = new BehaviorSubject<
    number
  >(100);

  private monstermanaSource: BehaviorSubject<number> = new BehaviorSubject<
    number
  >(50);

  private monstercardSource: ReplaySubject<string> = new ReplaySubject<
    string
  >();

  public monsterhealth$: Observable<
    number
  > = this.monsterhealthSource.asObservable();
  public monstermana$: Observable<
    number
  > = this.monstermanaSource.asObservable();
  public monsterhistory$: Observable<
    string
  > = this.monstercardSource.asObservable();



  // const myFunctionOnCallback2 = (currentHealthValue: number) => {
  //   this.monsterhp = currentHealthValue;
  // };
  // this.MonsterService.monsterhealth$.subscribe(myFunctionOnCallback2);

  public changeMonsterHealth(changeAmount: number): number {
    let nextMonsterHealthAmount;
    if (this.monsterhealthSource.getValue() > 0) {
      nextMonsterHealthAmount =
        this.monsterhealthSource.getValue() + changeAmount;
      if (nextMonsterHealthAmount > 100) {
        nextMonsterHealthAmount = 100;
      } else if (nextMonsterHealthAmount < 1) {
        nextMonsterHealthAmount = 0;
      }
    } else {
      nextMonsterHealthAmount = 0;
    }

    this.monsterhealthSource.next(nextMonsterHealthAmount);
    return nextMonsterHealthAmount;
  }

  public changeMonsterMana(changeAmount: number): number {
    const nextMonsterManaAmount =
      this.monstermanaSource.getValue() + changeAmount;
    this.monstermanaSource.next(nextMonsterManaAmount);
    return nextMonsterManaAmount;
  }

  public addMonsterHistory(newCard: string): string {
    this.monstercardSource.next(newCard);
    return newCard;
  }
}

import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { StartsettingsService } from "./startsettings.service";
import { Router, ActivatedRoute } from "../../node_modules/@angular/router";

@Injectable({
  providedIn: "root"
})
export class MonsterService {
  constructor(private startSettingService: StartsettingsService, private route: ActivatedRoute,
    private router: Router,) {
    //////
    setInterval(() => {
      if (
        this.monstermanaSource.getValue() < 100 &&
        this.monsterhealthSource.getValue() > 0
      ) {
        this.changeMonsterMana(+5);
      }
    }, 500);
    const initiateMonsterHealthfunction = (initialValue: number) => {
      let MonsterInitialHealthValue = initialValue;
      this.initialMonsterHealthValue = initialValue;
      this.monsterhealthSource.next(initialValue);
      return MonsterInitialHealthValue;
    };
    this.startSettingService.startMonsterHealth$.subscribe(
      initiateMonsterHealthfunction
    );
  }

  public initialMonsterHealthValue: number = this.startSettingService.startMonsterHealth.getValue();
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

  public changeMonsterHealth(changeAmount: number): number {
    let nextMonsterHealthAmount;
    if (this.monsterhealthSource.getValue() > 0) {
      nextMonsterHealthAmount =
        this.monsterhealthSource.getValue() + changeAmount;
      if (nextMonsterHealthAmount > this.initialMonsterHealthValue) {
        nextMonsterHealthAmount = this.initialMonsterHealthValue;
      } else if (nextMonsterHealthAmount < 1) {
        nextMonsterHealthAmount = 0;
        this.router.navigate(['/won']);
      }
    } else {
      nextMonsterHealthAmount = 0;
      this.router.navigate(['/won']);
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

import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HistoryService {
  constructor() {
    setInterval(() => {
      if (this.monstermanaSource.getValue() < 100) {
        this.changeMonsterMana(+1);
      }
    }, 1000);
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

  public changeMonsterHealth(changeAmount: number): number {
    const nextMonsterHealthAmount =
      this.monsterhealthSource.getValue() + changeAmount;
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

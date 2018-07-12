import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";

export enum CardType {
  SingleTargetDamage,
  AreaDamage,
  SelfHealing
}

export interface Card {
  name: string;
  manaCost: number;
  damage: number;
  type: CardType;
  playCard(
    changePlayerManaFunction: (changeManaAmount: number) => number,
    changePlayerHealthFunction: (changeHealthAmount: number) => number,
    changeMonsterManaFunction: (changeManaAmount: number) => number,
    changeMonsterHealthFunction: (changeHealthAmount: number) => number
  );
}

@Injectable({
  providedIn: "root"
})
export class PlayerService {
  private healthSource: BehaviorSubject<number> = new BehaviorSubject<number>(
    100
  );
  public health$: Observable<number> = this.healthSource.asObservable();

  private playercardSource: ReplaySubject<Card> = new ReplaySubject<Card>();

  public playerhistory$: Observable<
    Card
  > = this.playercardSource.asObservable();

  public changeHealth(changeAmount: number): number {
    const nextHealthAmount = this.healthSource.getValue() + changeAmount;
    this.healthSource.next(nextHealthAmount);
    return nextHealthAmount;
  }

  private manaSource: BehaviorSubject<number> = new BehaviorSubject<number>(50);
  public mana$: Observable<number> = this.manaSource.asObservable();

  public changeMana(changeAmount: number): number {
    const nextManaAmount = this.manaSource.getValue() + changeAmount;
    this.manaSource.next(nextManaAmount);
    return nextManaAmount;
  }

  public addPlayerHistory(newCard: Card): Card {
    this.playercardSource.next(newCard);
    return newCard;
  }

  constructor() {
    setInterval(() => {
      if (this.manaSource.getValue() < 100) {
        this.changeMana(+5);
      }
    }, 500);
  }
}

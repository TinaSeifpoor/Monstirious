import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HealthPointService {
  private healthSource: BehaviorSubject<number> = new BehaviorSubject<number>(
    100
  );
  public health$: Observable<number> = this.healthSource.asObservable();

  public changeHealth(changeAmount: number): number {
    const nextHealthAmount = this.healthSource.getValue() + changeAmount;
    this.healthSource.next(nextHealthAmount);
    return nextHealthAmount;
  }

  private manaSource: BehaviorSubject<number> = new BehaviorSubject<number>(
    100
  );
  public mana$: Observable<number> = this.manaSource.asObservable();

  public changeMana(changeAmount: number): number {
    const nextManaAmount = this.manaSource.getValue() + changeAmount;
    this.manaSource.next(nextManaAmount);
    return nextManaAmount;
  }
}

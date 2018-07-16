import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class StartsettingsService {
  constructor() {}

  public startMonsterHealth: BehaviorSubject<number> = new BehaviorSubject<
    number
  >(100);
  public startMonsterHealth$: Observable<
    number
  > = this.startMonsterHealth.asObservable();

  public setHealth(changeAmount: number): void {
    if ((changeAmount == 100)) {
      this.startMonsterHealth.next(100);
    } else if ((changeAmount == 200)) {
      this.startMonsterHealth.next(200);
    } else if ((changeAmount == 300)) {
      this.startMonsterHealth.next(300);
    }
  }

  }

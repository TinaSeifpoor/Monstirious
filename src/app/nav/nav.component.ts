import { Component, OnInit } from "@angular/core";
import { Card } from "../player.service";
import { RestoreHealth, Kick, SuperPunch, Dikshua, getRandomCard } from "../Cards/Interfaces";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  public cardPrimary: Card;
  public card2: Card;
  public card3: Card;
  public card4: Card;
  constructor() {}

  ngOnInit() {
    // this.cardPrimary = RestoreHealth;
    this.cardPrimary = getRandomCard();
    this.card2 = getRandomCard();
    this.card3 = getRandomCard();
    this.card4 = getRandomCard();
  }

  public onplayedPrimary(playAmount:number) {
    console.log(this.cardPrimary.name, "Primary is played " + playAmount + " times.");
    this.cardPrimary = getRandomCard(); // get rid of this part if restore helath should be there all time
  }

  public onplayed2() {
    console.log(this.card2.name, "is played");
    this.card2 = getRandomCard();
  }

  public onplayed3() {
    console.log(this.card3.name, "is played");
    this.card3 = getRandomCard();
  }

  public onplayed4() {
    console.log(this.card4.name, "is played");
    this.card4 = getRandomCard();
  }
}

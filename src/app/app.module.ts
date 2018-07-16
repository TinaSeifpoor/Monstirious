import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ScreenComponent } from "./screen/screen.component";
import { NavComponent } from "./nav/nav.component";
import { HPComponent } from "./hp/hp.component";
import { MNComponent } from "./mn/mn.component";

import { PlayerComponent } from "./player/player.component";
import { MonsterComponent } from "./monster/monster.component";
import { KickComponent } from "./Cards/cardholder2/cardholder2.component";
import { StartingComponent } from './starting/starting.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreenComponent,
    NavComponent,
    HPComponent,
    MNComponent,
    PlayerComponent,
    MonsterComponent,
    KickComponent,
    StartingComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

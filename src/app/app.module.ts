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
import { StartingComponent } from "./starting/starting.component";
import { GameScreenComponent } from "./game-screen/game-screen.component";

import { Routes, RouterModule } from "@angular/router";
import { WonComponent } from './won/won.component';
import { GameoverComponent } from './gameover/gameover.component';

const routes: Routes = [
  { path: "", redirectTo: "/startscreen", pathMatch: "full" },
  { path: "startscreen", component: StartingComponent },
  { path: "game", component: GameScreenComponent },
  { path: "won", component: WonComponent },
  { path: "gameover", component: GameoverComponent }
];

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
    StartingComponent,
    GameScreenComponent,
    WonComponent,
    GameoverComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

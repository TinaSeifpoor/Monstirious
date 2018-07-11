import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScreenComponent } from './screen/screen.component';
import { NavComponent } from './nav/nav.component';
import { HPComponent } from './hp/hp.component';
import { MNComponent } from './mn/mn.component';
import { RestoreHealthComponent } from './Cards/RestoreHealth/restorehealth.component';
import { PlayerComponent } from './player/player.component';
import { MonsterComponent } from './monster/monster.component';
import { KickComponent } from './Cards/kick/kick.component';
import { SuperpunchComponent } from './Cards/superpunch/superpunch.component';
import { DikshuaComponent } from './Cards/dikshua/dikshua.component';



@NgModule({
  declarations: [
    AppComponent,
    ScreenComponent,
    NavComponent,
    HPComponent,
    MNComponent,
    RestoreHealthComponent,
    PlayerComponent,
    MonsterComponent,
    KickComponent,
    SuperpunchComponent,
    DikshuaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

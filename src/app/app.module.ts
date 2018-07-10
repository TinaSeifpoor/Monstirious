import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScreenComponent } from './screen/screen.component';
import { NavComponent } from './nav/nav.component';
import { HPComponent } from './hp/hp.component';
import { MNComponent } from './mn/mn.component';
import { AB2Component } from './ab2/ab2.component';
import { RestoreHealthComponent } from './Cards/RestoreHealth/restorehealth.component';
import { PlayerComponent } from './player/player.component';
import { MonsterComponent } from './monster/monster.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreenComponent,
    NavComponent,
    HPComponent,
    MNComponent,
    RestoreHealthComponent,
    AB2Component,
    PlayerComponent,
    MonsterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

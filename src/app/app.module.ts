import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScreenComponent } from './screen/screen.component';
import { NavComponent } from './nav/nav.component';
import { HPComponent } from './hp/hp.component';
import { MNComponent } from './mn/mn.component';
import { AB1Component } from './ab1/ab1.component';
import { AB2Component } from './ab2/ab2.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreenComponent,
    NavComponent,
    HPComponent,
    MNComponent,
    AB1Component,
    AB2Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

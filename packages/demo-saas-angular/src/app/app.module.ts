import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FronteggModule } from '@frontegg/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FronteggModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}

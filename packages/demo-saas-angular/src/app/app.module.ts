import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { FronteggModule } from '@frontegg/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportsModule } from '../reports/reports.module';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { createCustomElement } from '@angular/elements';
import { ReportsComponent } from '../reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    FronteggModule,
    ReportsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(ReportsComponent, { injector: this.injector });
    customElements.define('mat-button', el);
  }
}

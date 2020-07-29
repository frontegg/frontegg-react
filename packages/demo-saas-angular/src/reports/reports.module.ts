import {  NgModule } from '@angular/core';
import {  FronteggReportsModule } from '@frontegg/angular';
import { ReportsComponent } from './reports.component';


@NgModule({
  declarations: [
    ReportsComponent,
  ],
  imports: [
    FronteggReportsModule,
  ],
  exports:[ReportsComponent]
})
export class ReportsModule {
}

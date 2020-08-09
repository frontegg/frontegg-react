import { Injector, NgModule } from '@angular/core';

import { ReportsComponent } from './reports.component';
import { createCustomElement } from '@angular/elements';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ReportsComponent,
  ],
  imports: [
    MatButtonModule,
  ],
  exports: [ReportsComponent],
})
export class ReportsModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(ReportsComponent, { injector: this.injector });
    customElements.define('reports-page-2', el);
  }
}

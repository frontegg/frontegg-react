import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'reports-page',
  template: `<button mat-button>Button</button>`,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ReportsComponent {
  reportsProps = {};
}


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from '../reports/reports.component';
import { ReportsModule } from '../reports/reports.module';

const routes: Routes = [
  { path:'reports', component: ReportsComponent },
  { path:'reports/report/:id', component: ReportsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ReportsModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewOrderComponent } from './containers/new-order/new-order.component';
import { StatusComponent } from './containers/status/status.component';

const routes: Routes = [
  { path: '', component: NewOrderComponent },
  { path: 'status', component: StatusComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

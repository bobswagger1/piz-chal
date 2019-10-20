import { PizzaService } from './containers/new-order/new-order.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidebarComponent } from './components/navigation/sidebar/sidebar.component';
import { PersonalFormComponent } from './components/personal-form/personal-form.component';
import { PizzaFormComponent } from './components/pizza-form/pizza-form.component';
import { NewOrderComponent } from './containers/new-order/new-order.component';
import { PizzaSummaryComponent } from './components/pizza-summary/pizza-summary.component';
import { StatusComponent } from './containers/status/status.component';
import { StatusOrdersComponent } from './components/status-orders/status-orders.component';
import { HttpClientModule } from '@angular/common/http';
import { StatusService } from './containers/status/status.service';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
// Import ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DashboardService } from './containers/dashboard/dashboard.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    PersonalFormComponent,
    PizzaFormComponent,
    NewOrderComponent,
    PizzaSummaryComponent,
    StatusComponent,
    StatusOrdersComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbCollapseModule,
    MomentModule.forRoot({relativeTimeThresholdOptions: { m: 59}}),
    NgCircleProgressModule.forRoot({
      backgroundPadding: 0,
      radius: 98,
      space: -10,
      outerStrokeColor: '#18c083',
      outerStrokeGradientStopColor: '#44c2c5',
      innerStrokeColor: '#e7e8ea',
      titleFontSize: '24',
      titleFontWeight: '500',
      subtitleColor: '#0a0a0a',
      subtitleFontWeight: '600',
      animateTitle: false,
      animationDuration: 1000,
      showBackground: false,
      showSubtitle: false,
      showUnits: false
    })
  ],
  providers: [
    PizzaService,
    StatusService,
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

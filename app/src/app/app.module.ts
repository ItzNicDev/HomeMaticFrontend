import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from "./pages/home/home.component";
import {NgChartsModule} from 'ng2-charts';
import {CounterComponent} from "./components/counter/counter.component";
import { Network } from '@ionic-native/network/ngx';

@NgModule({
    declarations: [AppComponent, HomeComponent, CounterComponent],
  imports: [BrowserModule, IonicModule.forRoot({mode:'ios'}), AppRoutingModule, NgChartsModule, HttpClientModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy},Network],
  bootstrap: [AppComponent],
})
export class AppModule {
}

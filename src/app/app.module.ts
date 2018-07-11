import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MaterialModule} from "./material.module";
import { ErrorComponent } from './components/error/error.component';
import { MainComponent } from './components/main/main.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MenuComponent } from './components/menu/menu.component';
import {RouteGuard} from "./RouteGuard/RouteGuard";
import {LanguageService} from "./services/language.service";
import {GameService} from "./services/game.service";
import { HelpComponent } from './components/help/help.component';
import {StatisticsService} from "./services/statistics.service";
import { StatisticsComponent } from './components/statistics/statistics.component';
import {AppLanguageService} from "./services/app-language.service";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    MainComponent,
    MenuComponent,
    HelpComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [TranslateModule],
  providers: [RouteGuard, LanguageService, GameService, StatisticsService, AppLanguageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/");
}

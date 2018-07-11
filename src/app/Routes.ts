import {Routes} from "@angular/router";
import {ErrorComponent} from "./components/error/error.component";
import {MainComponent} from "./components/main/main.component";
import {RouteGuard} from "./RouteGuard/RouteGuard";
import {HelpComponent} from "./components/help/help.component";
import {StatisticsComponent} from "./components/statistics/statistics.component";

export const MAIN_ROUTE = "main";
export const HELP_ROUTE = "help";
export const STATICTICS_ROUTE = "stat";
export const EMPTY_ROUTE = "";
export const JOKER_ROUTE = "**";

export const routes: Routes = [
  {path: MAIN_ROUTE, component: MainComponent, canActivate: [RouteGuard]},
  {path: HELP_ROUTE, component: HelpComponent, canActivate: [RouteGuard]},
  {path: STATICTICS_ROUTE, component: StatisticsComponent, canActivate: [RouteGuard]},
  {path: JOKER_ROUTE, redirectTo: MAIN_ROUTE, pathMatch: 'full'},
];

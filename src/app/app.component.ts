//npm install ng2-charts --save
//https://valor-software.com/ng2-charts/
//npm install chart.js --save
//<script src="node_modules/chart.js/src/chart.js"></script>

import {Component, enableProdMode} from '@angular/core';
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {icons} from "./Icons";

enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    for (let icon of icons) {
      iconRegistry.addSvgIcon(icon.selector, sanitizer.bypassSecurityTrustResourceUrl(icon.path))
    }
  }
}

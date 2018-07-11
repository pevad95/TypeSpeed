import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LANGUAGE_KEY} from "./language.service";
import {Observable} from "rxjs/index";

export const APP_LANGUAGE_KEY = "tp-app-lang";
export const HUNGARIAN_APP_LANGUAGE = "hu";
export const ENGLISH_APP_LANGUAGE = "en";

@Injectable()
export class AppLanguageService {

  constructor(private translate: TranslateService) {
    this.loadLanguage();
  }

  getLanguage(): string {
    let lang = localStorage.getItem(APP_LANGUAGE_KEY);
    return lang ? lang : HUNGARIAN_APP_LANGUAGE;
  }

  loadLanguage() {
    let lang = localStorage.getItem(APP_LANGUAGE_KEY);
    if (lang) {
      this.translate.setDefaultLang(lang);
    } else {
      this.translate.setDefaultLang(HUNGARIAN_APP_LANGUAGE);
    }
  }

  saveLanguage(lang: string) {
    localStorage.setItem(APP_LANGUAGE_KEY, lang);
    this.loadLanguage();
  }

  getText(key: string): Observable<string> {
    return this.translate.get(key);
  }
}

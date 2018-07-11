import { Injectable } from '@angular/core';

export const HUNGARIAN = "HU";
export const ENGLISH = "EN";
export const LANGUAGE_KEY = "language";

@Injectable()
export class LanguageService {

  constructor() { }

  loadLanguage() {
    let language = localStorage.getItem(LANGUAGE_KEY);
    return language ? language : HUNGARIAN;
  }

  saveLanguage(language: string) {
    localStorage.setItem(LANGUAGE_KEY, language);
  }
}

import { Component, OnInit } from '@angular/core';
import {ENGLISH, HUNGARIAN, LanguageService} from "../../services/language.service";
import {GAME_LEVEL_EXTREME, GAME_LEVEL_HARD, GAME_LEVEL_NORMAL, GameService} from "../../services/game.service";
import {AppLanguageService, ENGLISH_APP_LANGUAGE, HUNGARIAN_APP_LANGUAGE} from "../../services/app-language.service";

export interface Language {
  title: string;
  code: string;
}

export interface Level {
  title: string;
  code: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  languages: Language[] = [
    {title: "hungarianAppLanguage", code: HUNGARIAN},
    {title: "englishAppLanguage", code: ENGLISH}
  ];

  appLanguages: Language[] = [
    {title: "hungarianAppLanguage", code: HUNGARIAN_APP_LANGUAGE},
    {title: "englishAppLanguage", code: ENGLISH_APP_LANGUAGE}
  ];

  levels: Level[] = [
    {title: "menuComponent_normalLevel", code: GAME_LEVEL_NORMAL},
    {title: "menuComponent_hardLevel", code: GAME_LEVEL_HARD},
    {title: "menuComponent_extremeLevel", code: GAME_LEVEL_EXTREME}
  ];

  constructor(public languageService: LanguageService,
              public gameService: GameService,
              public appLanguageService: AppLanguageService) { }

  ngOnInit() {
  }

  chooseLanguage(code: string) {
    this.languageService.saveLanguage(code);
  }

  chooseAppLanguage(code: string) {
    this.appLanguageService.saveLanguage(code);
  }

  clearHistory() {
    localStorage.clear();
    this.appLanguageService.loadLanguage();
  }

  chooseLevel(code: string) {
    this.gameService.saveLevel(code);
  }

}

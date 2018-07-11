import { Injectable } from '@angular/core';
import {
  AVERAGE, AVERAGE_LIMIT, GOOD, GOOD_LIMIT, NOT_BAD, NOT_BAD_LIMIT, PERFECT, PERFECT_LIMIT,
  WEAK
} from "../Model/Game";
import {readTsconfig} from "@angular-devkit/build-angular/src/angular-cli-files/utilities/read-tsconfig";
import {GAME_LEVEL_HARD, GAME_LEVEL_NORMAL} from "./game.service";

export interface SavedResult {
  normalMax: number;
  hardMax: number;
  extremeMax: number;
  pressedKeys: number;
  tries: number;
}

export const NUM_OF_TRIES_KEY = "tp-num";
export const NUM_OF_PRESSED_KEYS = "tp-pressed";
export const MAX_SPEED_KEY = "tp-max";
export const RESULT_KEY = "tp-result";

@Injectable()
export class StatisticsService {

  constructor() { }

  saveResult(level: string, pressedKeys: number) {
    let result: SavedResult;
    result = this.loadResult();
    if (level == GAME_LEVEL_NORMAL) {
      result.normalMax = result.normalMax > pressedKeys ? result.normalMax : pressedKeys;
    } else if (level == GAME_LEVEL_HARD) {
      result.hardMax = result.hardMax > pressedKeys ? result.hardMax : pressedKeys;
    } else {
      result.extremeMax = result.extremeMax > pressedKeys ? result.extremeMax : pressedKeys;
    }

    result.tries = result.tries ? ++result.tries : 1;
    result.pressedKeys = result.pressedKeys ? result.pressedKeys + pressedKeys : pressedKeys;
    console.log(JSON.stringify(result));
    localStorage.setItem(RESULT_KEY, JSON.stringify(result));
  }

  loadResult(): SavedResult {
    let result = JSON.parse(localStorage.getItem(RESULT_KEY));
    if (!result) {
      result = {normalMax: 0, hardMax: 0, extremeMax: 0, pressedKeys: 0, tries: 0};
    }
    return result;
  }

  getNormalMax() {
    return this.loadResult().normalMax;
  }

  getHardMax() {
    return this.loadResult().hardMax;
  }

  getExtremeMax() {
    return this.loadResult().extremeMax;
  }

  getTries() {
    return this.loadResult().tries;
  }

  getPressedKeys() {
    return this.loadResult().pressedKeys;
  }

  getQualification(speed: number) {
    if (speed < NOT_BAD_LIMIT) {
      return WEAK;
    } else if (speed >= NOT_BAD_LIMIT && speed < AVERAGE_LIMIT) {
      return NOT_BAD;
    } else if (speed >= AVERAGE_LIMIT && speed < GOOD_LIMIT) {
      return AVERAGE;
    } else if (speed >= GOOD_LIMIT && speed < PERFECT_LIMIT) {
      return GOOD;
    } else {
      return PERFECT;
    }
  }

  averageSpeed(): number {
    let result = this.loadResult();
    if (result.tries == 0) {
      return 0;
    }

    return Math.floor(result.pressedKeys / result.tries);
  }

  isResultWeak(speed: number) {
    return this.getQualification(speed) == WEAK;
  }

  isResultNotBad(speed: number) {
    return this.getQualification(speed) == NOT_BAD;
  }

  isResultAverage(speed: number) {
    return this.getQualification(speed) == AVERAGE;
  }

  isResultGood(speed: number) {
    return this.getQualification(speed) == GOOD;
  }

  isResultPerfect(speed: number) {
    return this.getQualification(speed) == PERFECT;
  }
}

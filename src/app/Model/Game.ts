import {WordGenerator} from "./WordGenerator";
import {ONE_MINUTE_INTERVAL, TimeListener, Timer} from "./Timer";
import {LanguageService} from "../services/language.service";
import {GameService} from "../services/game.service";

export const GAME_OVER = true;
export const BONUS_POINT_LIMIT = 10;
export const WEAK = 0;
export const NOT_BAD = 1;
export const AVERAGE = 2;
export const GOOD = 3;
export const PERFECT = 4;
export const NOT_BAD_LIMIT = 50;
export const AVERAGE_LIMIT = 120;
export const GOOD_LIMIT = 200;
export const PERFECT_LIMIT = 300;
export const MULTIPLICATOR_LIMIT = 3;
export const HIDE_TIME = 500;

export const HARD_CHARS = "ÁÉÍÖÜÓŐÚŰ";

export interface GameListener {
  tick(time: number);
  tickProgress(time: number, maxTime: number);
  over(result: Result);
  newWord(word: string);
  correctWord();
  wrongWord();
  hideWord();
}

export interface Result {
  points: number;
  errors: number;
  skip: number;
  hits: number;
}

export class Game implements TimeListener {

  private word: string = "";
  private wordGenerator: WordGenerator;
  private timer: Timer;
  private listener: GameListener;
  private result: Result;
  private gameOver: boolean;
  private languageService: LanguageService;
  private gameService: GameService;

  constructor(listener: GameListener, languageService: LanguageService, gameService: GameService) {
    this.gameOver = GAME_OVER;
    this.listener = listener;
    this.languageService = languageService;
    this.timer = new Timer(ONE_MINUTE_INTERVAL, this);
    this.gameService = gameService;
  }

  setLanguage() {
    this.wordGenerator = new WordGenerator(this.languageService.loadLanguage());
  }

  start() {
    this.wordGenerator = new WordGenerator(this.languageService.loadLanguage());
    this.gameOver = !GAME_OVER;
    this.result = {points: 0, errors: 0, skip: 0, hits: 0};
    this.timer.start();
    this.newWord();
  }

  stop() {
    this.gameOver = GAME_OVER;
    this.timer.stop();
  }

  getWord(): string {
    return this.word;
  }

  halfIsCorrect(word: string) {
    let i = 0;
    while (i < word.length && word.charAt(i) == this.word.charAt(i)) {
      ++i;
    }
    console.log(i > Math.floor(this.word.length / 2.0));
    return i > Math.floor(this.word.length / 2.0);
  }

  countHardChars(word: string) {
    let num = 0;
    for (let i = 0; i < word.length; ++i) {
      if (HARD_CHARS.indexOf(word.charAt(i).toUpperCase()) >= 0) {
        num++;
      }
    }

    return num;
  }

  next(word: string) {
    if (this.gameOver) {
      return;
    }

    if (((this.gameService.isLevelHard() || this.gameService.isLevelExtreme()) && this.halfIsCorrect(word)) ||
      (!this.gameService.isLevelHard() && !this.gameService.isLevelExtreme())) {

      if (word == this.word) {
        this.result.points++;
        this.listener.correctWord();
        this.result.hits += word.length;
        if (this.countHardChars(word) > MULTIPLICATOR_LIMIT) {
          this.result.hits += 2;
        }
        if (word.length > BONUS_POINT_LIMIT) {
          this.result.points++;
        }
      } else if (!word) {
        this.result.skip++;
      } else {
        this.result.errors++;
        this.listener.wrongWord();
      }

      this.newWord();
    }
  }

  newWord() {
    this.word = this.wordGenerator.nextWord();
    this.listener.newWord(this.word);
    if (this.gameService.isLevelExtreme()) {
      setTimeout(() => this.hide(), HIDE_TIME);
    }
  }

  hide() {
    this.listener.hideWord();
  }

  tick(time: number) {
    this.listener.tick(time);
  }

  progressTick(time: number, maxTime: number) {
    this.listener.tickProgress(time, maxTime);
  }

  over() {
    this.gameOver = GAME_OVER;
    this.listener.over(this.result);
  }

  isOver() {
    return this.gameOver;
  }

  getWords(): number {
    return this.result? this.result.points : 0;
  }
}

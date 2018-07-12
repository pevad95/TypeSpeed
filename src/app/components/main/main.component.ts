import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {Game, GameListener, Result} from "../../Model/Game";
import {LanguageService} from "../../services/language.service";
import {GameService} from "../../services/game.service";
import {ONE_MINUTE_INTERVAL} from "../../Model/Timer";
import {StatisticsService} from "../../services/statistics.service";
import {Location} from "@angular/common";

export const SHOW_RESULT = true;
export const SCREAM_SOUND = "/assets/sounds/scream.mp3";
export const TIMER_SOUND = "/assets/sounds/timer.mp3";
export const TIMER_SOUND_LIMIT = 16;

export function incorrectWordValidator(word: string): ValidatorFn {
  return (control: AbstractControl): {
    [key: string]: any} | null => {
    const incorrect =  !word.startsWith(control.value.trim());
    return incorrect ? {'incorrectWord': {value: control.value}} : null;
  };
}

export interface Word {
  word: string;
  correct: boolean;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, GameListener {

  game: Game;
  word: string;
  tmpWord: string;
  time: number;
  result: Result;
  showResult: boolean;
  incorrectWord: boolean;
  timeLeftPercentage: number;
  correct: boolean;
  hide:boolean;
  wordIncorrect: boolean;
  numOfKeyStrokes: number;

  words: Word[] = [];

  wordForm: FormGroup;

  screamAudio: any;
  timerAudio: any;

  @ViewChild('wordInput') wordInput: ElementRef;

  constructor(private languageService: LanguageService,
              public gameService: GameService,
              public statisticsService: StatisticsService,
              private location: Location) {
    this.game = new Game(this, languageService, gameService);
    this.wordForm =  new FormGroup({
      typedWord: new FormControl({value: '', disabled: true}, [])
    });
  }

  ngOnInit() {
  }

  get typedWord(): AbstractControl {
    return this.wordForm.get('typedWord');
  }

  keyUp(event: any) {
    event.preventDefault();
    if (event.key != " ") {
      this.numOfKeyStrokes++;
    }
    this.tmpWord = this.word;
    this.wordIncorrect = !this.word.startsWith(this.typedWord.value.trim());
    if (event.key == " ") {
      this.game.next(this.typedWord.value.trim());
      this.wordForm.controls['typedWord'].setValue("");
    }
  }

  startGame() {
    this.timeLeftPercentage = 100;
    this.time = ONE_MINUTE_INTERVAL;
    this.showResult = !SHOW_RESULT;
    this.words = [];
    this.typedWord.enable();
    this.gameService.start();
    this.game.start();
    this.wordInput.nativeElement.focus();
    this.correct = true;
    this.numOfKeyStrokes = 0;
  }

  stopGame() {
    this.typedWord.setValue('');
    this.typedWord.disable();
    this.gameService.stop();
    this.game.stop();
    this.words = [];
  }

  tick(time: number) {
    this.time = time;
    this.timeLeftPercentage = (time / ONE_MINUTE_INTERVAL) * 100;
    if (time == TIMER_SOUND_LIMIT && this.gameService.isSoundOn()) {
      this.playTimerSound(TIMER_SOUND);
    }
  }

  tickProgress(time: number, maxTime: number) {
    //this.timeLeftPercentage = Math.floor((time / maxTime) * 100);
  }

  over(result: Result) {
    this.showResult = SHOW_RESULT;
    this.result = result;
    this.statisticsService.saveResult(this.gameService.getLevel(), result.hits);
    this.wordForm.controls['typedWord'].setValue("");
    this.typedWord.disable();
    this.gameService.stop();
  }

  newWord(word: string) {
    this.wordIncorrect = false;
    this.hide = false;
    this.word = word;
    this.wordForm.controls['typedWord'].setValidators(incorrectWordValidator(word));
  }

  correctWord() {
    this.correct = true;
    this.words.push({word: this.tmpWord, correct: true});
  }

  playScreamSound(url: string) {
    this.screamAudio = new Audio(this.location['_baseHref'] + url);
    this.screamAudio.play();
  }

  playTimerSound(url: string) {
    this.timerAudio = new Audio(this.location['_baseHref'] + url);
    this.timerAudio.play();
  }

  wrongWord() {
    this.correct = false;
    this.words.push({word: this.tmpWord, correct: false});
    if (this.gameService.isSoundOn()) {
      this.playScreamSound(SCREAM_SOUND);
    }
  }

  hideWord() {
    this.hide = true;
  }

  getSimpleSpeed(): number {
    return this.result.points + this.result.errors;
  }

  getEffectiveness() {
    if (this.numOfKeyStrokes == 0) {
      return 0;
    }

    return Math.floor((this.result.hits / this.numOfKeyStrokes) * 100);
  }

  getResultPercentage() {
    return this.result.points == 0 ?
      0 :
      Math.floor((this.result.points / (this.result.points + this.result.errors + this.result.skip)) * 100);
  }

}

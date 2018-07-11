import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {Game, GameListener, Result} from "../../Model/Game";
import {LanguageService} from "../../services/language.service";
import {GameService} from "../../services/game.service";
import {ONE_MINUTE_INTERVAL} from "../../Model/Timer";
import {MatProgressSpinner, MatSnackBar, MatSnackBarModule} from "@angular/material";
import {StatisticsService} from "../../services/statistics.service";

export const SHOW_RESULT = true;

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

  words: Word[] = [];

  wordForm: FormGroup;

  @ViewChild('wordInput') wordInput: ElementRef;

  constructor(private languageService: LanguageService,
              public gameService: GameService, public snackBar: MatSnackBar, public statisticsService: StatisticsService) {
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
    this.tmpWord = this.word;
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
    this.hide = false;
    this.word = word;
    this.wordForm.controls['typedWord'].setValidators(incorrectWordValidator(word));
  }

  correctWord() {
    this.correct = true;
    this.words.push({word: this.tmpWord, correct: true});
  }

  wrongWord() {
    this.correct = false;
    this.words.push({word: this.tmpWord, correct: false});
  }

  hideWord() {
    this.hide = true;
  }

  getSimpleSpeed(): number {
    return this.result.points + this.result.errors;
  }

  getResultPercentage() {
    return this.result.points == 0 ?
      0 :
      Math.floor((this.result.points / (this.result.points + this.result.errors + this.result.skip)) * 100);
  }

}

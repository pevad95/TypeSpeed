import {wordsEn, wordsHu} from "./Words";
import {ENGLISH, HUNGARIAN} from "../services/language.service";

export class WordGenerator {

  private language: string;

  constructor(language: string) {
    this.language = language;
  }

  nextWord(): string {
    switch(this.language) {
      case HUNGARIAN:
        return wordsHu[this.getRandom(wordsHu.length)];
      case ENGLISH:
        return wordsEn[this.getRandom(wordsEn.length)];
    }
  }

  getRandom(max: number): number {
    return Math.floor(Math.random() * (max));
  }

}

import { Injectable } from '@angular/core';

export const PLAYING = true;
export const GAME_LEVEL_KEY = "tp-level";
export const GAME_LEVEL_NORMAL = "normal";
export const GAME_LEVEL_EXTREME = "extreme";
export const GAME_LEVEL_HARD = "hard";
export const SOUNDS_KEY = "tp-sound";
export const SOUNDS_ON = "on";
export const SOUNDS_OFF = "off";

@Injectable()
export class GameService {

  private playing: boolean;

  constructor() {}

  start() {
    this.playing = PLAYING;
  }

  stop() {
    this.playing = !PLAYING;
  }

  isPlaying(): boolean {
    return this.playing;
  }

  isLevelHard(): boolean {
    let level = localStorage.getItem(GAME_LEVEL_KEY);
    return level && level == GAME_LEVEL_HARD;
  }

  isLevelExtreme() {
    let level = localStorage.getItem(GAME_LEVEL_KEY);
    return level && level == GAME_LEVEL_EXTREME;
  }

  saveLevel(level: string) {
    localStorage.setItem(GAME_LEVEL_KEY, level);
  }

  getLevel(): string {
    let level = localStorage.getItem(GAME_LEVEL_KEY);
    return level ? level : GAME_LEVEL_NORMAL;
  }

  soundsOn() {
    localStorage.setItem(SOUNDS_KEY, SOUNDS_ON);
  }

  soundsOff() {
    localStorage.setItem(SOUNDS_KEY, SOUNDS_OFF);
  }

  isSoundOn() {
    let sound = localStorage.getItem(SOUNDS_KEY);
    return sound && sound == SOUNDS_ON;
  }

  getSound() {
    let sound = localStorage.getItem(SOUNDS_KEY);
    return sound ? sound : SOUNDS_OFF;
  }
}

export const ONE_MINUTE_INTERVAL = 60;
export const TICK_PERIOD = 1000;
export const PROGRESS_TICK_PERIOD_TIME = 60;
export const TIMER_NAME = "timer";

export interface TimeListener {
  tick(time: number);
  progressTick(time: number, maxTime: number);
  over();
}

export class Timer {

  private maxTime: number;
  private timeLeft: number;
  private counter: number;
  private listener: TimeListener;

  private timer: any;

  constructor(time: number, listener: TimeListener) {
    this.maxTime = time;
    this.listener = listener;
  }

  start() {
    this.counter = this.maxTime * 1000;
    //this.stop();
    this.timeLeft = this.maxTime;
    this.timer = setInterval(() => this.tick(), TICK_PERIOD);
  }

  tick(): void {
    this.timeLeft--;
    if (this.timeLeft <= 0) {
      this.stop();
      this.listener.over();
    } else {
      this.listener.tick(this.timeLeft);
    }
  }

  stop() {
    clearInterval(this.timer);
  }

}

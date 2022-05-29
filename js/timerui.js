import {Timer} from './timer.js'

export class TimerUI extends HTMLElement {
  constructor() {
    super();
    this.timer = null;
    this.something = 102;

    this.seconds = document.createElement('p');
    this.seconds.innerHTML = 0;

    this.minutes = document.createElement('p');
    this.minutes .innerHTML = 0;

    this.hours = document.createElement('p');
    this.hours.innerHTML = 0;

    this.append(this.hours);
    this.append(this.minutes);
    this.append(this.seconds);
  }

  setTimer(duration) {
    this.timer = new Timer(duration, 
      ()=>{this.updateTimeDisplay();}, 
      ()=>{console.log('placeholder ring');});
    this.updateTimeDisplay();
  }

  updateTimeDisplay() {
    this.seconds.innerHTML = this.timer.timeLeft % 60;
    this.minutes.innerHTML = parseInt(this.timer.timeLeft / 60) % 60;
    this.hours.innerHTML = parseInt(this.timer.timeLeft / (60 * 60));
  }

  start() {
    this.timer.start();
  }
}

customElements.define("timer-ui", TimerUI);

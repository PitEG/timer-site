import {Timer} from './timer.js'

export class TimerUI extends HTMLElement {
  constructor() {
    super();
    this.timer = null;
    this.something = 102;

    this.root = document.createElement('div');

    this.seconds = document.createElement('p');
    this.seconds.innerHTML = 0;

    this.minutes = document.createElement('p');
    this.minutes .innerHTML = 0;

    this.hours = document.createElement('p');
    this.hours.innerHTML = 0;

    this.root.append(this.hours);
    this.root.append(this.minutes);
    this.root.append(this.seconds);
    
    this.append(this.root);
  }

  setTimer(duration) {
    this.timer = new Timer(duration, 
      ()=>{this.updateTimeDisplay();}, 
      ()=>{console.log('placeholder ring');});
    this.updateTimeDisplay();
  }

  updateTimeDisplay() {
    if (this.timer == null) { throw 'misisng timer'; }
    this.seconds.innerHTML = this.timer.timeLeft % 60;
    this.minutes.innerHTML = parseInt(this.timer.timeLeft / 60) % 60;
    this.hours.innerHTML = parseInt(this.timer.timeLeft / (60 * 60));
  }

  start() {
    if (this.timer == null) { throw 'misisng timer'; }
    this.timer.start();
  }
}

customElements.define("timer-ui", TimerUI);

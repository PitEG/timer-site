import {Timer} from './timer.js'

export class TimerUI extends HTMLElement {
  constructor() {
    super();
    this.timer = null;
    this.something = 102;

    this.root = document.createElement('div');

    // name
    this.name = document.createElement('h2');
    this.name.innerHTML = 'new timer';

    this.nameDiv = document.createElement('div');
    this.nameDiv.append(this.name);

    // clock
    this.seconds = document.createElement('p');
    this.seconds.innerHTML = 0;

    this.minutes = document.createElement('p');
    this.minutes .innerHTML = 0;

    this.hours = document.createElement('p');
    this.hours.innerHTML = 0;

    this.clock = document.createElement('div');
    this.clock.append(this.hours);
    this.clock.append(this.minutes);
    this.clock.append(this.seconds);
    
    this.root.append(this.nameDiv);
    this.root.append(this.clock);

    this.append(this.root);
    
    this.addEventListener('click',()=>{this.click();});
  }

  setTimer(duration) {
    this.timer = new Timer(duration, 
      ()=>{this.updateTimeDisplay();}, 
      ()=>{console.log('placeholder ring');});
    this.updateTimeDisplay();
  }

  updateTimeDisplay() {
    if (this.timer == null) { throw 'misisng timer'; }
    let seconds = this.timer.timeLeft % 60;
    let minutes = parseInt(this.timer.timeLeft / 60) % 60;
    let hours = parseInt(this.timer.timeLeft / (60 * 60)) % 60;

    let parsedSeconds = seconds >= 10 ? `${seconds}` : `0${seconds}`;
    let parsedMinutes = minutes >= 10 ? `${minutes}` : `0${minutes}`;
    let parsedHours   = hours   >= 10 ? `${hours}` : `0${hours}`;

    this.seconds.innerHTML  = parsedSeconds;
    this.minutes.innerHTML  = parsedMinutes;
    this.hours.innerHTML    = parsedHours;
  }

  click() {
    if (this.timer == null) { throw 'misisng timer'; }

    // first try resuming/starting
    if (!this.timer.start()) {
      // if it didn't start, it must already be running already so pause it.
      this.timer.pause();
    }
  }
}

customElements.define("timer-ui", TimerUI);

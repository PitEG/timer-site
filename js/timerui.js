import {Timer} from './timer.js'
import {setInputFilter} from './util.js'

export class TimerUI extends HTMLElement {
  constructor() {
    super();
    this.timer = null;
    this.maxTime = 3599;

    this.root = document.createElement('div');

    // name
    this.name = document.createElement('h2');
    this.name.innerHTML = 'new timer';

    this.nameDiv = document.createElement('div');
    this.nameDiv.append(this.name);

    this.root.append(this.nameDiv);

    // input
    this.input = document.createElement('div');
    this.input.setAttribute('tabindex',0); // allow for focusing
    this.input.addEventListener('keydown', (e) => {
      this.handleMaxTimeSet(e);
    });
    this.input.addEventListener('click', () => {
      this.inputS.innerText = 0;
      this.inputM.innerText = 0;
      this.inputH.innerText = 0;
    });

    this.inputS = document.createElement('p');
    this.inputS.innerText = 0;
    this.inputM = document.createElement('p');
    this.inputM.innerText = 0;
    this.inputH = document.createElement('p');
    this.inputH.innerText = 0;
    this.input.append(this.inputH);
    this.input.append(this.inputM);
    this.input.append(this.inputS);

    this.root.append(this.input);

    // clock
    this.hours = document.createElement('p');
    this.hours.innerHTML = 0;
    this.minutes = document.createElement('p');
    this.minutes .innerHTML = 0;
    this.seconds = document.createElement('p');
    this.seconds.innerHTML = 0;

    this.clock = document.createElement('div');
    this.clock.append(this.hours);
    this.clock.append(this.minutes);
    this.clock.append(this.seconds);
    
    this.root.append(this.clock);

    // add 
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

  handleMaxTimeSet(event) {
    // for inputing num keys 0 to 9
    if (48 <= event.keyCode && event.keyCode <= 57) {
      let digit = event.keyCode - 48;
      /*
      let secs = (this.maxTime % 60);
      let mins = parseInt(this.maxTime / 60) % 60;
      let hrs = (parseInt(this.maxTime / 3600)) * 10 + parseInt(mins / 10);
      mins = ((parseInt(this.maxTime / 60) % 60) * 10 + parseInt(secs / 10)) % 100; 
      secs = ((this.maxTime % 60) * 10 + digit) % 100; 
      */
      let hrs = this.inputH.innerText;
      let mins = this.inputM.innerText;
      let secs = this.inputS.innerText;

      this.inputH.innerText = parseInt(hrs) * 10 + parseInt(parseInt(mins) / 10);
      this.inputM.innerText = (parseInt(mins) * 10 + parseInt(parseInt(secs) / 10)) % 100;
      this.inputS.innerText = (parseInt(secs) * 10 + digit) % 100;
    }
    // for backspacing
    if (event.key === 'Backspace') {
      console.log('pressed backspace');
    }
    // commit the time
    if (event.key == 'Enter' || event.key == 'Escape') {
      console.log('pressed enter');
      this.input.blur();
      this.maxTime = parseInt(this.inputS.innerText) + parseInt(this.inputM.innerText) * 60 + parseInt(this.inputH.innerText) * 3600; 
      this.inputH.innerText = parseInt(this.maxTime / 3600);
      this.inputM.innerText = parseInt(this.maxTime / 60) % 60;
      this.inputS.innerText = this.maxTime % 60;
      console.log(this.maxTime);
    }
  }

  click() {
    if (this.timer == null) { throw 'misisng timer'; }

    // first try resuming/starting
    if (!this.timer.start()) {
      // if it didn't start, it must already be running already so pause it.
      this.timer.pause();
    }
  }

  // converts something like 100 to 1 min and 0 seconds instead of 1 min 40 seconds
  static intToTime(time) {
    let secs = time % 100;
    let mins = parseInt(time / 100) % 100;
    let hrs = parseInt(time / 10000) % 100;
    return secs + mins * 60 + hrs * 3600;
  }
}

customElements.define("timer-ui", TimerUI);

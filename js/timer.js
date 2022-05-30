export class Timer {
  #_startAmount
  #_timeLeft
  #_interval

  // duration is in seconds, callback is called every second, 
  // and finish callback is called when the timer reaches 0 during countdown.
  constructor(duration, callback, finishCallback) {
    this.#_startAmount = duration;
    this.#_timeLeft = duration;
    this.callback = callback;
    this.finishCallback = finishCallback;
  }

  // returns time left in seconds
  get timeLeft() {
    return this.#_timeLeft;
  }

  get startAmount() {
    return this.#_startAmount;
  }

  #stopCountDown() {
    if (this.#_interval != null) {
      clearInterval(this.#_interval);
      this.#_interval = null;
    }
  }
  
  #startCountDown() {
    if (this.#_interval == null) {
      let timer = this;
      this.#_interval = setInterval(function(){ timer.increment(); }, 1000);
    }
  }

  increment() {
    this.#_timeLeft--;
    // console.log('time left:', this.#_timeLeft);
    this.callback();

    // if the timer is done, stop the interval
    if (this.#_timeLeft <= 0) {
      // console.log("stopping countdown");
      this.#stopCountDown();
      this.finishCallback();
    }
  }

  start() {
    // console.log('starting');
    // return if already started
    if (this.#_interval != null) {
      return false;
    }

    // run down the clock every second
    this.#startCountDown();
    return true;
  }

  pause() {
    // console.log('pausing');
    // return if already paused
    if (this.#_interval == null) {
      return false;
    }
    this.#stopCountDown();
    return true;
  }

  resume() {
    // console.log('resuming');
    // return if not started yet
    if (this.#_interval != null) {
      return false;
    }

    this.#startCountDown();
    return true;
  }

  reset() {
    // console.log('reseting');
    // stop counting
    this.#stopCountDown();

    // reset time left
    this.#_timeLeft = this.#_startAmount;
  }
}

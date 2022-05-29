export class Timer {
  #_startAmount
  #_timeLeft
  #_interval

  constructor(duration, callback) {
    this.#_startAmount = duration;
    this.#_timeLeft = duration;
    // runs this callback every second
    this.callback = callback;
  }

  get timeLeft() {
    return this.#_startAmount;
  }

  get startAmount() {
    return this.#_timeLeft;
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
    console.log('time left:', this.#_timeLeft);
    this.callback();

    // if the timer is done, stop the interval
    if (this.#_timeLeft <= 0) {
      console.log("stopping countdown");
      this.#stopCountDown();
    }
  }

  start() {
    // return if already started
    if (this.#_interval != null) {
      return;
    }

    // run down the clock every second
    this.#startCountDown();
  }

  pause() {
    // stop counting
    this.#stopCountDown();
  }

  resume() {
    // return if not started yet
    if (this.#_interval == null) {
      return;
    }

    this.#startCountDown();
  }

  reset() {
    // stop counting
    this.#stopCountDown();

    // reset time left
    this.#_timeLeft = this.#_startAmount;
  }
}

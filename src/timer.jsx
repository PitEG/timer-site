import React from 'react';

function TimeDisplay(props) {
  // split into hrs, mins and seconds
  const seconds = props.seconds;
  let hrs = parseInt(seconds/3600);
  let mins = parseInt(seconds/60) % 60;
  let secs = seconds % 60;
  hrs  = isNaN(hrs) ? 0 : hrs;
  mins = isNaN(mins) ? 0 : mins;
  secs = isNaN(secs) ? 0 : secs;
  return (
      // <input type="tel" pattern="[0-9]"></input> // for mobile keyboard
    <div>
      <p> {hrs >= 10 ? hrs : "0" + hrs} </p>
      <p> {mins >= 10 ? mins : "0" + mins} </p>
      <p> {secs >= 10 ? secs : "0" + secs} </p>
    </div>
  );
}

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.numInput = React.createRef();

    const startAmount = props.startAmount !== undefined ? props.startAmount : 0;
    this.state = {
      setAmount: startAmount,
      settingTimer: false,
      startAmount: startAmount, 
      timeLeft: startAmount, 
      ticking: false}; 

    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);

    this.handleInput = this.handleInput.bind(this);
    this.focusTimeSet = this.focusTimeSet.bind(this);
    this.blurTimeSet = this.blurTimeSet.bind(this);
    this.enterTime = this.enterTime.bind(this);
  }

  tick() {
    // if current timeleft is 1 before ticking, we assume it's going to 0 and end timer
    if (this.state.timeLeft === 1) {
      clearInterval(this.intervalId);
      this.setState(()=>({ticking: false}));
    }
    this.setState((prevState)=>({timeLeft: prevState.timeLeft - 1}));
  }

  handleStart() {
    if (this.state.ticking) return; // just in case
    if (this.state.timeLeft === 0) return;
    this.intervalId = setInterval(()=>this.tick(),1000);
    this.setState({ticking:true});
  }

  handleStop() {
    if (!this.state.ticking) return; // just in case
    clearInterval(this.intervalId);
    this.setState({ticking:false});
  }

  focusTimeSet() {
    this.numInput.current.focus();
    this.setState(()=>({settingTimer: true}))

    this.numInput.current.value = this.state.startAmount;
  }

  blurTimeSet() {
    this.numInput.current.blur();
    this.setState((prevState)=>({settingTimer: false, startAmount: prevState.setAmount}));
  }

  handleInput(e) {
    // 0 to 9
    if (48 <= e.charCode && e.charCode <= 57) {
    }

    let newValue = e.target.value.replace(/\D/g,'');
    const maxLength = 6;
    if (newValue.length > maxLength) {
      newValue = newValue.substr(-maxLength);
    }

    // parse int as clock time into secs

    e.target.value = newValue;
    this.setState({setAmount: parseInt(newValue)});
    console.log(Timer.clockToSec(newValue.toString()));
  }

  enterTime(e) {
    if (e.key === "Enter") {
      console.log('pressed enter');
      // this.setState((prevState)=>({startAmount: prevState.setAmount}));
      this.numInput.current.blur();
    }
  }

  render() {
    const ticking = this.state.ticking;
    return (
      <div>
        <h2> TIMER NAME </h2>
        <input 
          type="tel" 
          ref={this.numInput} 
          tabIndex={-1}
          // value={this.state.setAmount}
          onChange={(e)=>{this.handleInput(e)}}
          onBlur={(e)=>{this.blurTimeSet(e)}}
          onKeyDown={(e)=>{this.enterTime(e)}}
        />
        <div tabIndex={1} onFocus={()=>{this.focusTimeSet()}}>
          <TimeDisplay 
            seconds={this.state.settingTimer ? this.state.setAmount : this.state.startAmount}
            // seconds={this.startAmount}
          />
        </div>
        <TimeDisplay seconds={this.state.timeLeft}/>
        <button onClick={ticking ? this.handleStop: this.handleStart}> 
          {ticking ? "stop" : "start" }
        </button>
      </div>
    );
  }

  // returns the +h:mm:ss representation for a given number of seconds
  static secToClock(num) {
    const hrs = parseInt(num/3600) 
    const mins = parseInt(num/60) % 60
    const secs = num % 60
    return {hrs:hrs,mins:mins,secs:secs};
  }

  // any string where it's formatted like `+hmmss`, returns num of seconds
  static clockToSec(clock) {
    let secs = parseInt(clock.slice(clock.length-2,clock.length));
    let mins = parseInt(clock.slice(clock.length-4,clock.length-2));
    let hrs = parseInt(clock.slice(clock.length-6,clock.length-4));
    secs = isNaN(secs) ? 0 : secs;
    mins = isNaN(mins) ? 0 : mins;
    hrs  = isNaN(hrs) ? 0 : hrs;

    return hrs * 3600 + mins * 60 + secs;
  }
}

function TimerCollection() {
  return (
    <div> 
      <Timer startAmount={4}/>
      <Timer />
      <Timer />
    </div>
  );
}

export default TimerCollection;

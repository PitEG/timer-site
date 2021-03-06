import React, { useState } from 'react';
import alarm from './alarm.wav';
import './App.css';

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
    <div className="time-display">
      <span>{hrs  >= 10 ? hrs  : "0" + hrs}<span>:</span></span>
      <span>{mins >= 10 ? mins : "0" + mins}:</span>
      <span>{secs >= 10 ? secs : "0" + secs}</span>
    </div>
  );
}

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.numInput = React.createRef();

    this.alarm = new Audio(alarm);
    // enables looping
    this.alarm.addEventListener('ended',function() {
      this.currentTime = 0;
      this.play();
    });

    const startAmount = props.startAmount !== undefined ? props.startAmount : 0;
    this.state = {
      setAmount: startAmount,
      settingTimer: false,
      startAmount: startAmount, 
      timeLeft: startAmount, 
      ticking: false}; 

    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.handleInput = this.handleInput.bind(this);
    this.focusTimeSet = this.focusTimeSet.bind(this);
    this.blurTimeSet = this.blurTimeSet.bind(this);
    this.enterTime = this.enterTime.bind(this);

    this.stopAlarmSound = this.stopAlarmSound.bind(this);
  }

  tick() {
    // if current timeleft is 1 before ticking, we assume it's going to 0 and end timer
    if (this.state.timeLeft === 1) {
      clearInterval(this.intervalId);
      this.setState(()=>({ticking: false}));
      this.alarm.play();
    }
    this.setState((prevState)=>({timeLeft: prevState.timeLeft - 1}));
  }

  stopAlarmSound() {
    this.alarm.pause();
    this.alarm.currentTime = 0;
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

  handleReset() {
    this.handleStop();
    this.setState((prevState)=>({timeLeft:prevState.setAmount}));
  }

  focusTimeSet() {
    this.numInput.current.focus();
    this.setState(()=>({settingTimer: true}))

    this.numInput.current.value = Timer.secToClock(this.state.startAmount);
    // this.numInput.current.value = this.state.startAmount;
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

    // pad string with 0's so it fits the format `dddddd`
    newValue = newValue.padStart(6,'0');

    e.target.value = newValue;
    this.setState({setAmount: Timer.clockToSec(newValue)});
    // console.log(Timer.clockToSec(newValue.toString()));
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
      <div className="timer" onClick={this.stopAlarmSound}>
        <div>
          <div>
            <h2>
              <input type="text" 
                defaultValue="TIMER NAME" 
                className="timer-name"
                />
              </h2>
            <input 
              type="tel" 
              ref={this.numInput} 
              tabIndex={-1}
              // value={this.state.setAmount}
              onChange={(e)=>{this.handleInput(e)}}
              onBlur={(e)=>{this.blurTimeSet(e)}}
              onKeyDown={(e)=>{this.enterTime(e)}}
              className="hidden"
              />
            <div tabIndex={1} onFocus={()=>{this.focusTimeSet()}}>
              <TimeDisplay 
                seconds={this.state.settingTimer ? this.state.setAmount : this.state.startAmount}
                // seconds={this.startAmount}
              />
              </div>
            </div>
          <TimeDisplay seconds={this.state.timeLeft}/>
          </div>
        <div className="buttons">
          <button onClick={this.props.onDelete}>
            {"delete"}
            </button>
          <button onClick={this.handleReset}>
            reset
            </button>
          <button onClick={ticking ? this.handleStop: this.handleStart}> 
            {ticking ? "stop" : "start" }
            </button>
          </div>
        </div>
    );
  }

  // returns the +h:mm:ss representation for a given number of seconds
  static secToClock(num) {
    if (isNaN(num)) { 
      return "000000"; 
    }
    let hrs = parseInt(num/3600) 
    let mins = parseInt(num/60) % 60
    let secs = num % 60
    secs = secs >= 10 ? secs.toString() : `0${secs}`;
    mins = mins >= 10 ? mins.toString() : `0${mins}`;
    hrs = hrs >= 10 ? hrs.toString() : `0${hrs}`;
    // return {hrs:hrs,mins:mins,secs:secs};
    return hrs + mins + secs;
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
  const [timerList, setTimerList] = useState([]);
  const [timerId, setTimerId] = useState(0);

  const defaultTime = 300;
  const addTimer = () => {
    setTimerList(()=>{
      timerList.push({sec: defaultTime, id:timerId}); 
      return timerList;
    });
    setTimerId(timerId+1);
  }

  const deleteTimer = (id) => () => {
    setTimerList((timerList)=>timerList.filter(timer=> timer.id !== id));
  }

  const timers = timerList.map((timer)=>(
    <Timer key={timer.id} startAmount={timer.sec} onDelete={deleteTimer(timer.id)}/>)
  )

  return (
    <div className="timer-collection"> 
      <button onClick={addTimer}> + </button>
      {timers}
    </div>
  );
}

export default TimerCollection;

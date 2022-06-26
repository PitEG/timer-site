import React from 'react';

function TimeDisplay(props) {
  // split into hrs, mins and seconds
  const seconds = props.seconds;
  const hrs = parseInt(seconds/3600);
  const mins = parseInt(seconds/60) % 60;
  const secs = seconds % 60;
  return (
      // <input type="tel" pattern="[0-9]"></input> // for mobile keyboard
    <div tabIndex={1} onKeyPress={props.onKeyPress}>
      <p> {hrs >= 10 ? hrs : "0" + hrs} </p>
      <p> {mins >= 10 ? mins : "0" + mins} </p>
      <p> {secs >= 10 ? secs : "0" + secs} </p>
    </div>
  );
}

class Timer extends React.Component {
  constructor(props) {
    super(props);

    const startAmount = props.startAmount !== undefined ? props.startAmount : 0;
    this.state = {startAmount: startAmount, timeLeft: startAmount, ticking: false}; 
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleInput = this.handleInput.bind(this);
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

  handleInput(e) {
    // 0 to 9
    if (48 <= e.charCode && e.charCode <= 57) {
    }
    console.log(e.key);
  }

  render() {
    const ticking = this.state.ticking;
    return (
      <div>
        <h2> TIMER NAME </h2>
        <TimeDisplay seconds={this.state.startAmount} onKeyPress={(e)=>{this.handleInput(e)}}/>
        <TimeDisplay seconds={this.state.timeLeft}/>
        <button onClick={ticking ? this.handleStop: this.handleStart}> 
          {ticking ? "stop" : "start" }
        </button>
      </div>
    );
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

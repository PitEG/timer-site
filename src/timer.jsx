import React from 'react';

function TimeDisplay(props) {
  // split into hrs, mins and seconds
  const seconds = props.seconds;
  const hrs = parseInt(seconds/3600);
  const mins = parseInt(seconds/60) % 60;
  const secs = seconds % 60;
  return (
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

    const startAmount = props.startAmount !== undefined ? props.startAmount : 0;
    this.state = {startAmount: startAmount, timeLeft: startAmount, ticking: false}; 
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  tick() {
    if (this.state.timeLeft === 0 && this.intervalId !== undefined) {
      clearInterval(this.intervalId);
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

  render() {
    const ticking = this.state.ticking;
    return (
      <div>
        <h2> TIMER NAME </h2>
        <TimeDisplay seconds={this.state.startAmount}/>
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

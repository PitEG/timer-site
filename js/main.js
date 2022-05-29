import { TimerUI } from './timerui.js'

let debug = document.getElementById('debug');

let timerui = new TimerUI;
debug.append(timerui);

timerui.setTimer(3604);
timerui.start();

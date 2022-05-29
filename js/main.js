import { Timer } from './timer.js'
import { TimerUI } from './timerui.js'

let debug = document.getElementById('debug');

let timerui = new TimerUI;
debug.append(timerui);

timerui.setTimer(3600);
timerui.start();

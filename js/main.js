import { TimerUI } from './timerui.js'
import { enableShortcuts } from './shortcuts.js'

enableShortcuts();
let debug = document.getElementById('debug');

let timerui = new TimerUI;
debug.append(timerui);

timerui.setTimer(3604);
timerui.start();

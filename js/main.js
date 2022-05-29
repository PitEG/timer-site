import { TimerUI } from './timerui.js'
import { enableShortcuts } from './shortcuts.js'

enableShortcuts();
let timerList = document.getElementById('timer-list');

let timerui = new TimerUI;
timerList.append(timerui);

timerui.setTimer(3604);
timerui.start();

timerList.addEventListener('click', ()=>{console.log('something');});

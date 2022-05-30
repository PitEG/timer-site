import { TimerUI } from './timerui.js'
import { enableShortcuts } from './shortcuts.js'

enableShortcuts();
let timerList = document.getElementById('timer-list');

let timerui1 = new TimerUI;
let timerui2 = new TimerUI;
timerList.append(timerui1);
timerList.append(timerui2);

timerui1.setTimer(3604);
timerui1.click();

timerui2.setTimer(10);
timerui2.click();

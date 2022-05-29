import { Timer } from './timer.js'

console.log('hi');

let timer = new Timer(10, function() { console.log('hi there');});
timer.start();

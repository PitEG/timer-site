export function enableShortcuts() {
  var keyboardListener = document.addEventListener('keypress', (event) => {
    let code = event.code;
    // console.log(`key code: ${code}`);
  }, false);
}

export function disableShortcuts() {
  document.removeEventListener(keyboardListener);
}

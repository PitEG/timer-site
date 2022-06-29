import ReactDOM from 'react-dom/client';
import React from 'react';

import TimerCollection from './timer.jsx';

let root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  return (
    <main>
      <header>
        <h1>timer-site</h1>
        <hr/>
        </header>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      <TimerCollection/>
    </main>
  )
}

root.render(<App/>);

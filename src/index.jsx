import ReactDOM from 'react-dom/client';
import React from 'react';

import TimerCollection from './timer.jsx';

let root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  return (
    <main>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      <h1> Hi There. </h1>
      <TimerCollection/>
    </main>
  )
}

root.render(<App/>);

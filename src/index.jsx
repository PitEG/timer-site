import ReactDOM from 'react-dom/client';
import React from 'react';

import TimerCollection from './timer.jsx';

let root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  return (
    <main>
      <h1> Hi There. </h1>
      <TimerCollection/>
    </main>
  )
}

root.render(<App/>);

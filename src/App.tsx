import React, { useEffect } from 'react';
import './App.css';
let appStart:boolean = false
function App() {
  useEffect(() => {
    if (appStart) {return}
    console.log('App started');
    appStart = true;
    console.log('Hello World');
  }, []);

  return (
    <div >
      Hello World s
    </div>
  );
}

export default App;

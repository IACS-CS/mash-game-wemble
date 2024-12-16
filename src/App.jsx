import { useState } from "react";
import "./App.css";

const App = () => {

  // Note: this function runs once when the App starts up
  // and then again any piece of state 
  // changes!
  
  // Example state and setter
  const [toggle,setToggle] = useState(true);

  // The console.log statement below will show you each time
  // the App renders.
  console.log('Rendering app!','toggle is',toggle);


  // actions  

  // render parts of our output...
  const renderLightSwitch = () => {
    if (toggle) {
      return <div>🟢⚡✅ We are on </div>
    } else {
      return <div>🔴🔕❌ We are off :-(</div>
    }
  }

  return (
  <main>
    <h1>Hello React World</h1>
    <div className="col">
      <button onClick={()=>setToggle(!toggle)}>Click me!</button>
      <div>
        {renderLightSwitch()}
      </div>
    </div>    
  </main>
  );
};

export default App;
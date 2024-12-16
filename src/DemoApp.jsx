import { useState } from "react";
import "./App.css";

let answers = [
  'react','JavaScript','programming','state','events'
];

const App = () => {
  const [answer, setAnswer] = useState('react');
  const [correct, setCorrect] = useState(false);
  const [guesses,setGuesses] = useState([]);
  const [nextGuess,setNextGuess] = useState("");

  // actions
  const applyGuess = () => {   
    setGuesses([...guesses,nextGuess]);
    setNextGuess("");
    if (nextGuess === answer) {
      setCorrect(true);
    } 
  }
  const restart = () => {
    setGuesses([]);
    setNextGuess("");
    setCorrect(false);
    setAnswer(
      answers[Math.floor(Math.random()*answers.length)]
    );
  }

  // render parts of our output...
  const renderGuesses = (guesses) => {
    if (guesses.length > 0) {
      let renderedGuesses = [];
      for (let g of guesses) {
        renderedGuesses.push(<div>{g}</div>);
      }
      return renderedGuesses;
    } else {
      return <div>You haven't guessed yet</div>;
    }
  }
  const renderFeedback = () => {
    if (correct) {
      return (
        <div>
          <h2>OMG, you got it right!</h2>
          <button onClick={restart}>Reset Game</button>
        </div>
      )
    } else {
      return renderGuesses(guesses);
    }
  }

  return (
  <main>
    <h2>Time to guess!</h2>
    <div className="row">
      <input
        onChange={(e) => setNextGuess(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            applyGuess();
          }
        }}
        value={nextGuess}
        placeholder="Type your guess"
      />
      <button onClick={()=>applyGuess()}>Guess</button>
    </div>
    <div>
      {renderFeedback()}
    </div>
    
    
  </main>
  );
};

export default App;
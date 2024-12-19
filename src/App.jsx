import { useState } from "react";
import "./App.css";

const App = () => {
  // State for the three text boxes with initial values 1, 2, and 3
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');

  // State to store the randomly selected value
  const [selectedValue, setSelectedValue] = useState('');
  
  // State to store the saved value and navigation to new page
  const [savedValue, setSavedValue] = useState(null);
  const [showDishesPage, setShowDishesPage] = useState(false);

  // Function to randomly select one of the input values and set it
  const handleRandomSelection = () => {
    const inputs = [input1, input2, input3];
    const randomValue = inputs[Math.floor(Math.random() * inputs.length)];
    setSelectedValue(randomValue);
  };

  // Save the selected value and navigate to a new page
  const saveValueAndNavigate = () => {
    setSavedValue(selectedValue);  // Save the selected value
    setShowDishesPage(true);        // Navigate to the new page
  };

  // Render the main content or the dishes input page
  if (showDishesPage) {
    return (
      <div>
        <h1>Enter 3 Main Dishes</h1>
        <input
          type="text"
          placeholder="Dish 1"
        />
        <input
          type="text"
          placeholder="Dish 2"
        />
        <input
          type="text"
          placeholder="Dish 3"
        />
        <button onClick={() => alert('Dishes submitted!')}>Save and Move to the next step</button>
      </div>
    );
  }

  return (
    <main>
      <h1>Welcome to the Indecisive Decider</h1>

      {/* Text Inputs Section */}
      <div>
        <h2>Enter 3 restaurants you want to go to:</h2>

        <div>
          <input
            type="text"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            placeholder="Enter first restaurant"
          />
        </div>

        <div>
          <input
            type="text"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            placeholder="Enter second restaurant"
          />
        </div>

        <div>
          <input
            type="text"
            value={input3}
            onChange={(e) => setInput3(e.target.value)}
            placeholder="Enter third restaurant"
          />
        </div>

        <button 
          onClick={handleRandomSelection} 
          disabled={selectedValue}>  {/* Disable button after selection */}
          Randomly Select
        </button>

        {selectedValue && (
          <div>
            <h3>Randomly Selected Value:</h3>
            <p>{selectedValue}</p>
          </div>
        )}
      </div>

      {/* Save button to save the selected value and navigate to the next page */}
      {selectedValue && !savedValue && (
        <button onClick={saveValueAndNavigate}>Save & Go to Next Page</button>
      )}

      {/* Display the saved value on the side of the page */}
      {savedValue && (
        <div className="savedValue">
          <h3>Saved Value:</h3>
          <p>{savedValue}</p>
        </div>
      )}
    </main>
  );
};

export default App;

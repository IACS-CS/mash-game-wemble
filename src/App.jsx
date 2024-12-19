import { useState } from "react";
import "./App.css";

const App = () => {
  // State for the three restaurant inputs
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');

  // State to store the randomly selected restaurant
  const [selectedValue, setSelectedValue] = useState('');

  // State for saving the restaurant and navigating to the dishes page
  const [savedValue, setSavedValue] = useState(null);
  const [showDishesPage, setShowDishesPage] = useState(false);

  // State to store the dishes entered by the user
  const [dishes, setDishes] = useState({ dish1: '', dish2: '', dish3: '' });

  // State to store the sides entered by the user
  const [sides, setSides] = useState({ side1: '', side2: '', side3: '' });

  // State to store the saved dishes and navigation to the next page
  const [showSidesPage, setShowSidesPage] = useState(false);

  // State to store the randomly selected dish
  const [randomDish, setRandomDish] = useState(null);

  // State to track all selected restaurant-dish pairs
  const [selectionHistory, setSelectionHistory] = useState([]);

  // Function to randomly select one of the restaurant inputs
  const handleRandomSelection = () => {
    const inputs = [input1, input2, input3];
    const randomValue = inputs[Math.floor(Math.random() * inputs.length)];
    setSelectedValue(randomValue);
  };

  // Save the selected restaurant and navigate to the dishes page
  const saveValueAndNavigate = () => {
    setSavedValue(selectedValue);  // Save the selected restaurant
    setShowDishesPage(true);        // Navigate to the dishes page
  };

  // Handle dish input changes
  const handleDishChange = (e) => {
    const { name, value } = e.target;
    setDishes((prevDishes) => ({
      ...prevDishes,
      [name]: value,
    }));
  };

  // Handle side input changes
  const handleSideChange = (e) => {
    const { name, value } = e.target;
    setSides((prevSides) => ({
      ...prevSides,
      [name]: value,
    }));
  };

  // Save dishes and navigate to the sides page
  const saveDishesAndNavigate = () => {
    setShowSidesPage(true);         // Navigate to the sides page
  };

  // Function to randomly select one of the dishes and display it
  const handleRandomDishSelection = () => {
    const dishValues = [dishes.dish1, dishes.dish2, dishes.dish3];
    const nonEmptyDishes = dishValues.filter(dish => dish.trim() !== ''); // Filter out empty dishes
    if (nonEmptyDishes.length > 0) {
      const randomDish = nonEmptyDishes[Math.floor(Math.random() * nonEmptyDishes.length)];
      setRandomDish(randomDish); // Set the random dish to state

      // Add the selected restaurant and random dish to the history
      setSelectionHistory((prevHistory) => [
        ...prevHistory,
        { restaurant: savedValue, dish: randomDish },
      ]);
    } else {
      setRandomDish(null); // If no dishes are entered, reset the random dish
    }
  };

  // Render the main content, dishes input page, or sides input page
  if (showSidesPage) {
    return (
      <div>
        <h1>Enter 3 Sides for {savedValue} - {randomDish}</h1> {/* Display the selected restaurant and dish */}
        
        <input
          type="text"
          name="side1"
          placeholder="Side 1"
          value={sides.side1}
          onChange={handleSideChange}
        />
        <input
          type="text"
          name="side2"
          placeholder="Side 2"
          value={sides.side2}
          onChange={handleSideChange}
        />
        <input
          type="text"
          name="side3"
          placeholder="Side 3"
          value={sides.side3}
          onChange={handleSideChange}
        />
        <button onClick={() => alert('Sides submitted!')}>Save and Finish</button>
      </div>
    );
  }

  if (showDishesPage) {
    return (
      <div>
        <h1>Enter 3 Main Dishes for {savedValue}</h1> {/* Display the selected restaurant */}
        <input
          type="text"
          name="dish1"
          placeholder="Dish 1"
          value={dishes.dish1}
          onChange={handleDishChange}
        />
        <input
          type="text"
          name="dish2"
          placeholder="Dish 2"
          value={dishes.dish2}
          onChange={handleDishChange}
        />
        <input
          type="text"
          name="dish3"
          placeholder="Dish 3"
          value={dishes.dish3}
          onChange={handleDishChange}
        />
        <button onClick={saveDishesAndNavigate}>Save Dishes & Go to Sides Page</button>

        {/* Display the selected restaurant and dishes list */}
        {dishes.dish1 && dishes.dish2 && dishes.dish3 && (
          <div>
            <h2>Saved Dishes for {savedValue}:</h2>
            <ul>
              <li>{dishes.dish1}</li>
              <li>{dishes.dish2}</li>
              <li>{dishes.dish3}</li>
            </ul>
          </div>
        )}

        {/* Button to randomly select a dish */}
        <button onClick={handleRandomDishSelection}>Randomly Select a Dish</button>

        {/* Display the randomly selected dish */}
        {randomDish && (
          <div>
            <h3>Randomly Selected Dish:</h3>
            <p>{randomDish}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <main>
      <h1>Welcome to the Indecisive Decider</h1>

      {/* Text Inputs Section for restaurants */}
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

        <button onClick={handleRandomSelection}>Randomly Select</button>
        {selectedValue && (
          <div>
            <h3>Randomly Selected Value:</h3>
            <p>{selectedValue}</p>
          </div>
        )}
      </div>

      {/* Save button to save the selected restaurant and navigate to the next page */}
      {selectedValue && !savedValue && (
        <button onClick={saveValueAndNavigate}>Save & Go to Dishes Page</button>
      )}

      {/* Display the saved value */}
      {savedValue && (
        <div className="savedValue">
          <h3>Saved Value:</h3>
          <p>{savedValue}</p>
        </div>
      )}

      {/* Box at the bottom to display restaurant and dishes */}
      <div className="selectionBox">
        <h2>Selected Restaurant & Dish History:</h2>
        {selectionHistory.length === 0 ? (
          <p>No selections made yet.</p>
        ) : (
          <ul>
            {selectionHistory.map((selection, index) => (
              <li key={index}>
                {selection.restaurant} - {selection.dish}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default App;
``

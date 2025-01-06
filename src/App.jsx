import { useState } from "react";
import "./App.css";

const App = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [savedValue, setSavedValue] = useState(null);
  const [showDishesPage, setShowDishesPage] = useState(false);
  const [showSidesPage, setShowSidesPage] = useState(false);
  const [showDrinksPage, setShowDrinksPage] = useState(false);
  const [showFinalPage, setShowFinalPage] = useState(false); // New state for final page
  const [dishes, setDishes] = useState({ dish1: '', dish2: '', dish3: '' });
  const [sides, setSides] = useState({ side1: '', side2: '', side3: '' });
  const [drinks, setDrinks] = useState({ drink1: '', drink2: '', drink3: '' });
  const [randomDish, setRandomDish] = useState(null);
  const [randomSide, setRandomSide] = useState(null);
  const [randomDrink, setRandomDrink] = useState(null);
  const [selectionHistory, setSelectionHistory] = useState([]);

  const handleRandomSelection = () => {
    const inputs = [input1, input2, input3];
    const randomValue = inputs[Math.floor(Math.random() * inputs.length)];
    setSelectedValue(randomValue);
  };

  const saveValueAndNavigate = () => {
    setSavedValue(selectedValue);
    setShowDishesPage(true);
  };

  const handleDishChange = (e) => {
    const { name, value } = e.target;
    setDishes((prevDishes) => ({
      ...prevDishes,
      [name]: value,
    }));
  };

  const handleSideChange = (e) => {
    const { name, value } = e.target;
    setSides((prevSides) => ({
      ...prevSides,
      [name]: value,
    }));
  };

  const handleDrinkChange = (e) => {
    const { name, value } = e.target;
    setDrinks((prevDrinks) => ({
      ...prevDrinks,
      [name]: value,
    }));
  };

  const saveDishesAndNavigate = () => {
    setShowSidesPage(true);
    setShowDishesPage(false);
  };

  const saveSidesAndNavigate = () => {
    setShowSidesPage(false);
    setShowDrinksPage(true);
  };

  const handleRandomDishSelection = () => {
    const dishValues = [dishes.dish1, dishes.dish2, dishes.dish3];
    const nonEmptyDishes = dishValues.filter(dish => dish.trim() !== '');
    if (nonEmptyDishes.length > 0) {
      const randomDish = nonEmptyDishes[Math.floor(Math.random() * nonEmptyDishes.length)];
      setRandomDish(randomDish);
      setSelectionHistory((prevHistory) => [
        ...prevHistory,
        { restaurant: savedValue, dish: randomDish },
      ]);
    } else {
      setRandomDish(null);
    }
  };

  const handleRandomSideSelection = () => {
    const sideValues = [sides.side1, sides.side2, sides.side3];
    const nonEmptySides = sideValues.filter(side => side.trim() !== '');
    if (nonEmptySides.length > 0) {
      const randomSide = nonEmptySides[Math.floor(Math.random() * nonEmptySides.length)];
      setRandomSide(randomSide);
      setSelectionHistory((prevHistory) => [
        ...prevHistory,
        { restaurant: savedValue, dish: randomDish, side: randomSide },
      ]);
    } else {
      setRandomSide(null);
    }
  };

  const handleRandomDrinkSelection = () => {
    const drinkValues = [drinks.drink1, drinks.drink2, drinks.drink3];
    const nonEmptyDrinks = drinkValues.filter(drink => drink.trim() !== '');
    if (nonEmptyDrinks.length > 0) {
      const randomDrink = nonEmptyDrinks[Math.floor(Math.random() * nonEmptyDrinks.length)];
      setRandomDrink(randomDrink);
      setSelectionHistory((prevHistory) => [
        ...prevHistory,
        { restaurant: savedValue, dish: randomDish, side: randomSide, drink: randomDrink },
      ]);
    } else {
      setRandomDrink(null);
    }
  };

  const SavedInfoBox = () => (
    <div className="saved-info-box">
      <h3>Saved Information</h3>
      {savedValue && <p><strong>Restaurant:</strong> {savedValue}</p>}
      {randomDish && <p><strong>Random Dish:</strong> {randomDish}</p>}
      {randomSide && <p><strong>Random Side:</strong> {randomSide}</p>}
      {randomDrink && <p><strong>Random Drink:</strong> {randomDrink}</p>}
    </div>
  );

  // Back Button Component
  const BackButton = ({ goBack }) => (
    <button onClick={goBack}>Back</button>
  );

  // Final Page (Show all selections)
  if (showFinalPage) {
    return (
      <div>
        <h1>Your Selections</h1>
        <ul>
          {selectionHistory.map((item, index) => (
            <li key={index}>
              <strong>Restaurant:</strong> {item.restaurant} <br />
              <strong>Dish:</strong> {item.dish} <br />
              <strong>Side:</strong> {item.side} <br />
              <strong>Drink:</strong> {item.drink}
            </li>
          ))}
        </ul>
        <button onClick={() => setShowFinalPage(false)}>Go Back</button>
      </div>
    );
  }

  // Sides Page
  if (showSidesPage) {
    return (
      <div>
        <BackButton goBack={() => { setShowSidesPage(false); setShowDishesPage(true); }} />
        <h1>Enter 3 Sides for {savedValue} - {randomDish}</h1>
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
        <button onClick={saveSidesAndNavigate}>Save Sides & Go to Drinks Page</button>

        {/* Randomizer button */}
        <button onClick={handleRandomSideSelection}>Randomly Select a Side</button>
        {randomSide && (
          <div>
            <h3>Randomly Selected Side:</h3>
            <p>{randomSide}</p>
          </div>
        )}

        <SavedInfoBox />
      </div>
    );
  }

  // Drinks Page
  if (showDrinksPage) {
    return (
      <div>
        <BackButton goBack={() => { setShowDrinksPage(false); setShowSidesPage(true); }} />
        <h1>Enter 3 Drinks for {savedValue} - {randomDish}</h1>
        <input
          type="text"
          name="drink1"
          placeholder="Drink 1"
          value={drinks.drink1}
          onChange={handleDrinkChange}
        />
        <input
          type="text"
          name="drink2"
          placeholder="Drink 2"
          value={drinks.drink2}
          onChange={handleDrinkChange}
        />
        <input
          type="text"
          name="drink3"
          placeholder="Drink 3"
          value={drinks.drink3}
          onChange={handleDrinkChange}
        />
        <button onClick={handleRandomDrinkSelection}>Randomly Select a Drink</button>
        <button onClick={() => { setShowFinalPage(true); }}>Save & Show Final Page</button>

        {/* Randomizer button */}
        {randomDrink && (
          <div>
            <h3>Randomly Selected Drink:</h3>
            <p>{randomDrink}</p>
          </div>
        )}

        <SavedInfoBox />
      </div>
    );
  }

  // Dishes Page
  if (showDishesPage) {
    return (
      <div>
        <BackButton goBack={() => { setShowDishesPage(false); setSavedValue(null); }} />
        <h1>Enter 3 Main Dishes for {savedValue}</h1>
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

        {/* Randomizer button */}
        <button onClick={handleRandomDishSelection}>Randomly Select a Dish</button>
        {randomDish && (
          <div>
            <h3>Randomly Selected Dish:</h3>
            <p>{randomDish}</p>
          </div>
        )}

        <SavedInfoBox />
      </div>
    );
  }

  return (
    <main>
      <h1>Welcome to the Indecisive Decider</h1>

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
      {selectedValue && !savedValue && (
        <button onClick={saveValueAndNavigate}>Save & Go to Dishes Page</button>
      )}

      <SavedInfoBox />
    </main>
  );
};

export default App;

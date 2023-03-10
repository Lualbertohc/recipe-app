import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import context from '../context/context';
import fetchAPI from '../services/fetchApi';

function SearchBar() {
  const INGREDIENT = 'Ingredient';
  const NAME = 'Name';
  const FIRST_LETTER = 'First letter';

  const {
    inputSelected,
    setFoods,
    setDrinks,
    setInputSelected,
  } = useContext(context);
  const [searchInput, setSearchInput] = useState('');
  const location = useLocation();

  const path = location.pathname.replace(/\//g, '');

  const handleClick = async () => {
    const url = path === 'meals' ? 'themealdb' : 'thecocktaildb';

    switch (path) {
    case 'meals':
      if (inputSelected === FIRST_LETTER && searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else if (inputSelected === NAME) {
        const { meals: foodName } = await fetchAPI(url, 'search.php?s', searchInput);
        setFoods(foodName);
      } else if (inputSelected === INGREDIENT) {
        const { meals: ingredientFood } = await
        fetchAPI(url, 'filter.php?i', searchInput);
        setFoods(ingredientFood);
      } else {
        const { meals: foodFirstLetter } = await
        fetchAPI(url, 'search.php?f', searchInput);
        setFoods(foodFirstLetter);
      }
      break;
    default:
      if (inputSelected === FIRST_LETTER && searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else if (inputSelected === NAME) {
        const { drinks: drinkName } = await fetchAPI(url, 'search.php?s', searchInput);
        setDrinks(drinkName);
      } else if (inputSelected === INGREDIENT) {
        const { drinks: ingredientDrink } = await
        fetchAPI(url, 'filter.php?i', searchInput);
        setDrinks(ingredientDrink);
      } else {
        const { drinks: drinkFirstLetter } = await
        fetchAPI(url, 'search.php?f', searchInput);
        setDrinks(drinkFirstLetter);
      }
      break;
    }
  };

  const handleChangeInput = ({ target }) => {
    setSearchInput(target.value);
  };

  return (
    <div>
      <label htmlFor="search-input">
        {inputSelected}
        <input
          type="text"
          value={ searchInput }
          onChange={ handleChangeInput }
          name="search-input"
          data-testid="search-input"
        />
      </label>
      <div>
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          value="Ingredient"
          checked={ inputSelected === 'Ingredient' }
          onClick={ ({ target }) => setInputSelected(target.value) }
          name="search-input"
        />
        {' '}
        Ingredient
        <input
          data-testid="name-search-radio"
          type="radio"
          value="Name"
          checked={ inputSelected === 'Name' }
          onClick={ ({ target }) => setInputSelected(target.value) }
          name="search-input"
        />
        {' '}
        Name
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          value="First letter"
          checked={ inputSelected === 'First letter' }
          onClick={ ({ target }) => setInputSelected(target.value) }
          name="search-input"
        />
        {' '}
        First letter
      </div>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleClick }
      >
        Procurar

      </button>
    </div>
  );
}

export default SearchBar;

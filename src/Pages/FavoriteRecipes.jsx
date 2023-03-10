import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import context from '../context/context';

// const paraTestes = [
//   {
//     id: '53060',
//     name: 'Burek',
//     type: 'meal',
//     nationality: 'Croatian',
//     category: 'Side',
//     tags: ['teste', 'teste2'],
//     doneDate: '01/11/2022',
//     image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
//     alcoholicOrNot: '',
//   },
//   {
//     id: '13501',
//     name: 'ABC',
//     type: 'drink',
//     nationality: '',
//     category: 'Shot',
//     tags: [],
//     doneDate: '01/11/2022',
//     image: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
//     alcoholicOrNot: 'Alcoholic',
//   },
// ];

export default function Favorites() {
  const { setTitle, setIconSearch } = useContext(context);

  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [typeRecipeSelected, setTypeRecipeSelected] = useState('');
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    if (pathname === '/favorite-recipes') {
      setTitle('Favorite Recipes');
      setIconSearch(false);
    }
  }, [pathname, setIconSearch, setTitle]);

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(getLocalStorage);
    // setFavoriteRecipes(paraTestes);
  }, [favoriteRecipes]);

  function handleClick({ target: { name } }) {
    switch (name) {
    case 'meal':
      return setTypeRecipeSelected(name);
    case 'drink':
      return setTypeRecipeSelected(name);
    default:
      return setTypeRecipeSelected(name);
    }
  }

  function handleClickDirection(nameType, id) {
    const path = `/${nameType}/${id}`;
    history.push(path);
  }

  function handleClickShare(type, id) {
    setIsLinkCopied(true);
    copy(`http://localhost:3000/${type}/${id}`);
  }

  function handleClickFAvorite(idTarget) {
    console.log(idTarget);
    const newFilterFavorites = localStorage.filter((recipe) => recipe.id !== idTarget);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFilterFavorites));
    setFavoriteRecipes(newFilterFavorites);
  }

  return (
    <div>
      <Header />
      <button
        type="button"
        name=""
        data-testid="filter-by-all-btn"
        onClick={ handleClick }
      >
        All
      </button>
      <button
        type="button"
        name="meal"
        data-testid="filter-by-meal-btn"
        onClick={ handleClick }
      >
        Meals
      </button>
      <button
        type="button"
        name="drink"
        data-testid="filter-by-drink-btn"
        onClick={ handleClick }
      >
        Drinks
      </button>

      {favoriteRecipes
      && favoriteRecipes.filter((recipe) => recipe.type.includes(typeRecipeSelected))
        .map((recipe, index) => (
          <>
            <button
              type="button"
              onClick={ recipe.type === 'meal'
                ? () => handleClickDirection('meals', recipe.id)
                : () => handleClickDirection('drinks', recipe.id) }
            >
              <img
                key={ index }
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                width="150px"
              />
              <h2 data-testid={ `${index}-horizontal-name` }>
                {recipe.name}
              </h2>
            </button>
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              { recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot}
            </h3>

            {/* <button
              type="button"
              onClick={ handleClickFAvorite }
            >
              <img
                id={ recipe.id }
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="favorite"
              />
            </button> */}
            <input
              onClick={ () => handleClickFAvorite(recipe.id) }
              type="image"
              alt="favorite"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
            />

            <button
              type="button"
              onClick={ recipe.type === 'meal'
                ? () => handleClickShare('meals', recipe.id)
                : () => handleClickShare('drinks', recipe.id) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="shareRecipe"
              />
            </button>

            {isLinkCopied && <p>Link copied!</p>}
          </>
        ))}
    </div>
  );
}

import React, { useEffect, useContext } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import context from '../context/context';
import fetchAPI from '../services/fetchApi';
import RecommendedMeals from '../components/RecommendedMeals';
import RecommendedDrinks from '../components/RecomendedDrinks';
import ShareAndFavoriteBtn from '../components/ShareAndFavoriteBtn';

function RecipeDetails() {
  const { mealsDetailsState, setMealsDetailsState, drinksDetailsState,
    setDrinksDetailsState } = useContext(context);
  const { id } = useParams();
  const { location: { pathname } } = useHistory();
  useEffect(() => {
    const fetchMealsDetails = async () => {
      const mealsDetails = await fetchAPI(
        'themealdb',
        'lookup.php?i',
        id,
      );
      setMealsDetailsState(mealsDetails);
    };
    const fetchDrinksDetails = async () => {
      const drinksDetails = await fetchAPI(
        'thecocktaildb',
        'lookup.php?i',
        id,
      );
      setDrinksDetailsState(drinksDetails);
    };
    if (pathname.includes('meals')) {
      fetchMealsDetails();
    }
    if (pathname.includes('drinks')) {
      fetchDrinksDetails();
    }
  }, [id, pathname, setDrinksDetailsState, setMealsDetailsState]);

  return (
    <div>
      {
        (Object.values(mealsDetailsState)[0]
        || Object.values(drinksDetailsState)[0]) === null
        && global.alert('Erro')
      }
      {Object.keys(mealsDetailsState)[0] === 'meals'
        && (
          <>
            {
              mealsDetailsState.meals.map((element, index) => (
                <div key={ index }>
                  <img
                    data-testid="recipe-photo"
                    src={ element.strMealThumb }
                    alt={ element.strMeal }
                  />
                  <h1 data-testid="recipe-title">{ element.strMeal }</h1>
                  <h2 data-testid="recipe-category">{ element.strCategory }</h2>
                  <p data-testid={ `${index}-ingredient-name-and-measure` }>
                    { element.strIngredient1 }
                  </p>
                  <p data-testid={ `${index}-ingredient-name-and-measure` }>
                    { element.strMeasure1 }
                  </p>
                  <p data-testid={ `${index + 1}-ingredient-name-and-measure` }>
                    { element.strIngredient2 }
                  </p>
                  <p data-testid={ `${index + 1}-ingredient-name-and-measure` }>
                    { element.strMeasure2 }
                  </p>
                  <p data-testid={ `${index + 2}-ingredient-name-and-measure` }>
                    { element.strIngredient3 }
                  </p>
                  <p data-testid={ `${index + 2}-ingredient-name-and-measure` }>
                    { element.strMeasure3 }
                  </p>
                  <p data-testid={ `${index + Number('3')}-ingredient-name-and-measure` }>
                    { element.strIngredient4 }
                  </p>
                  <p data-testid={ `${index + Number('3')}-ingredient-name-and-measure` }>
                    { element.strMeasure4 }
                  </p>
                  <p data-testid={ `${index + Number('4')}-ingredient-name-and-measure` }>
                    { element.strIngredient5 }
                  </p>
                  <p data-testid={ `${index + Number('4')}-ingredient-name-and-measure` }>
                    { element.strMeasure5 }
                  </p>
                  <p data-testid={ `${index + Number('5')}-ingredient-name-and-measure` }>
                    { element.strIngredient6 }
                  </p>
                  <p data-testid={ `${index + Number('5')}-ingredient-name-and-measure` }>
                    { element.strMeasure6 }
                  </p>
                  <p data-testid={ `${index + Number('6')}-ingredient-name-and-measure` }>
                    { element.strIngredient7 }
                  </p>
                  <p data-testid={ `${index + Number('6')}-ingredient-name-and-measure` }>
                    { element.strMeasure7 }
                  </p>
                  <p data-testid={ `${index + Number('7')}-ingredient-name-and-measure` }>
                    { element.strIngredient8 }
                  </p>
                  <p data-testid={ `${index + Number('7')}-ingredient-name-and-measure` }>
                    { element.strMeasure8 }
                  </p>
                  <p data-testid={ `${index + Number('8')}-ingredient-name-and-measure` }>
                    { element.strIngredient9 }
                  </p>
                  <p data-testid={ `${index + Number('8')}-ingredient-name-and-measure` }>
                    { element.strMeasure9 }
                  </p>
                  <p data-testid={ `${index + Number('9')}-ingredient-name-and-measure` }>
                    { element.strIngredient10 }
                  </p>
                  <p data-testid={ `${index + Number('9')}-ingredient-name-and-measure` }>
                    { element.strMeasure10 }
                  </p>
                  <p data-testid="instructions">{ element.strInstructions }</p>
                  <iframe
                    data-testid="video"
                    src={ element.strYoutube }
                    title={ element.strMeal }
                  />
                </div>
              ))
            }
          </>
        )}
      {Object.keys(drinksDetailsState)[0] === 'drinks'
      && (
        <>
          {
            drinksDetailsState.drinks.map((element, index) => (
              <div key={ index }>
                <img
                  data-testid="recipe-photo"
                  src={ element.strDrinkThumb }
                  alt={ element.strDrink }
                />
                <h1 data-testid="recipe-title">{ element.strDrink }</h1>
                <h2 data-testid="recipe-category">{ element.strCategory }</h2>
                {
                  element.strAlcoholic
                  && <p data-testid="recipe-category">{element.strAlcoholic}</p>
                }
                <p data-testid={ `${index}-ingredient-name-and-measure` }>
                  { element.strIngredient1 }
                </p>
                <p data-testid={ `${index}-ingredient-name-and-measure` }>
                  { element.strMeasure1 }
                </p>
                <p data-testid={ `${index + 1}-ingredient-name-and-measure` }>
                  { element.strIngredient2 }
                </p>
                <p data-testid={ `${index + 1}-ingredient-name-and-measure` }>
                  { element.strMeasure2 }
                </p>
                <p data-testid={ `${index + 2}-ingredient-name-and-measure` }>
                  { element.strIngredient3 }
                </p>
                <p data-testid={ `${index + 2}-ingredient-name-and-measure` }>
                  { element.strMeasure3 }
                </p>
                <p data-testid={ `${index + Number('3')}-ingredient-name-and-measure` }>
                  { element.strIngredient4 }
                </p>
                <p data-testid={ `${index + Number('3')}-ingredient-name-and-measure` }>
                  { element.strMeasure4 }
                </p>
                <p data-testid={ `${index + Number('4')}-ingredient-name-and-measure` }>
                  { element.strIngredient5 }
                </p>
                <p data-testid={ `${index + Number('4')}-ingredient-name-and-measure` }>
                  { element.strMeasure5 }
                </p>
                <p data-testid={ `${index + Number('5')}-ingredient-name-and-measure` }>
                  { element.strIngredient6 }
                </p>
                <p data-testid={ `${index + Number('5')}-ingredient-name-and-measure` }>
                  { element.strMeasure6 }
                </p>
                <p data-testid={ `${index + Number('6')}-ingredient-name-and-measure` }>
                  { element.strIngredient7 }
                </p>
                <p data-testid={ `${index + Number('6')}-ingredient-name-and-measure` }>
                  { element.strMeasure7 }
                </p>
                <p data-testid={ `${index + Number('7')}-ingredient-name-and-measure` }>
                  { element.strIngredient8 }
                </p>
                <p data-testid={ `${index + Number('7')}-ingredient-name-and-measure` }>
                  { element.strMeasure8 }
                </p>
                <p data-testid={ `${index + Number('8')}-ingredient-name-and-measure` }>
                  { element.strIngredient9 }
                </p>
                <p data-testid={ `${index + Number('8')}-ingredient-name-and-measure` }>
                  { element.strMeasure9 }
                </p>
                <p data-testid={ `${index + Number('9')}-ingredient-name-and-measure` }>
                  { element.strIngredient10 }
                </p>
                <p data-testid={ `${index + Number('9')}-ingredient-name-and-measure` }>
                  { element.strMeasure10 }
                </p>
                <p data-testid="instructions">{ element.strInstructions }</p>
                <iframe
                  data-testid="video"
                  src={ element.strYoutube }
                  title={ element.strMeal }
                />
              </div>
            ))
          }
        </>
      )}
      <ShareAndFavoriteBtn />
      <h1>Receitas Recomendadas</h1>
      { pathname.includes('meals') && <RecommendedDrinks /> }
      { pathname.includes('drinks') && <RecommendedMeals /> }
      <Link
        to={ `${pathname}/in-progress` }
      >
        <button
          style={ { position: 'fixed', bottom: '0px' } }
          type="button"
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>
      </Link>
    </div>
  );
}

export default RecipeDetails;

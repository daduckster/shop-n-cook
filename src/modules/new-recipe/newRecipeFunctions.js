import {
	inputDishName,
	inputIngredients,
	inputWeight,
	inputMeasure,
	inputRecipeText,
	ulIngredientContainer,
	recipesInStorage,
	ingredientsArray,
} from './newRecipeElements.js';
import { createIngredientDOM } from './newRecipeDOM.js';
import { createID, updateLocalStorage } from '/src/index';

// INGREDIENTS /////////////////////////////////////////////////

const addNewIngredient = e => {
	e.preventDefault();

	const ingredientName = inputIngredients.value;
	const ingredientWeight = inputWeight.value;
	const ingredientMeasure = inputMeasure.value;

	const newIngredient = `${ingredientName} ${ingredientWeight}${ingredientMeasure}`;

	createIngredientDOM(newIngredient);
};

const deleteIngredient = liIngredient => {
	ulIngredientContainer.removeChild(liIngredient);
};

const cleanInputsIngredients = () => {
	inputIngredients.value = '';
	inputWeight.value = '';
	inputMeasure.value = '';
};

// ADD NEW RECIPE /////////////////////////////////////////////////

const addNewRecipe = e => {
	e.preventDefault();
	if (!inputDishName.value) {
		inputDishName.classList.add('js-empty-field');
		return;
	} else if (inputDishName.classList.contains('js-empty-field')) {
		inputDishName.classList.remove('js-empty-field');
	}
	const newRecipe = createRecipeFactory();
	updateLocalStorage(newRecipe);
	cleanInputsAndLists();
};

const createRecipeFactory = (name, ingredients, recipeText, id) => {
	name = inputDishName.value;
	ingredients = Object.assign({}, ingredientsArray);
	recipeText = inputRecipeText.value;
	id = `id${createID()}`;
	return { name, ingredients, recipeText, id };
};

const cleanInputsAndLists = () => {
	ulIngredientContainer.textContent = '';
	inputDishName.value = '';
	inputIngredients.value = '';
	inputWeight.value = '';
	inputMeasure.value = '';
	inputRecipeText.value = '';
};

export { addNewIngredient, addNewRecipe, deleteIngredient, cleanInputsIngredients };

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
		console.log('hi');
		return;
	} else if (inputDishName.classList.contains('js-empty-field')) {
		inputDishName.classList.remove('js-empty-field');
	}
	const newRecipe = createRecipeFactory();
	updateLocalStorage(newRecipe);
	cleanInputsAndLists();
};

const createRecipeFactory = (name, ingredients, recipeText) => {
	name = inputDishName.value;
	ingredients = Object.assign({}, ingredientsArray);
	recipeText = inputRecipeText.value;
	return { name, ingredients, recipeText };
};

const updateLocalStorage = newRecipe => {
	recipesInStorage.unshift(newRecipe);
	localStorage.setItem('recipesInStorage', JSON.stringify(recipesInStorage));
	ingredientsArray.length = 0;
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
import { createID } from '/src/index';
import { recipesInStorage } from '../new-recipe/newRecipeElements.js';
import { createRecipeDOM, recipesContainer } from './recipeItem';

const populateList = () => {
	cleanRecipesList();
	recipesInStorage.map(recipe => {
		createRecipeDOM(recipe);
	});
};

const cleanRecipesList = () => {
	recipesContainer.innerHTML = '';
};

const deleteRecipe = recipe => {
	localStorage.removeItem('recipesInStorage');
	const filteredRecipes = recipesInStorage.filter(recipeInStorage => recipeInStorage.id !== recipe.id);
	recipesInStorage = filteredRecipes;
	localStorage.setItem('recipesInStorage', JSON.stringify(recipesInStorage));

	console.log(recipeToDelete);
};

// INGREDIENT-CHECKBOXES ////////////////////////////////////////////////

const createIngredientBox = (ingredient, ingredientsContainer) => {
	const ingredientId = `${createID()}${ingredient.replace('', '-')}`;

	const ingredientLabel = document.createElement('label');
	ingredientLabel.innerHTML = ingredient;
	ingredientLabel.htmlFor = ingredientId;

	const ingredientCheckbox = document.createElement('input');
	ingredientCheckbox.setAttribute('type', 'checkbox');
	ingredientCheckbox.id = ingredientId;

	ingredientCheckbox.addEventListener('change', () => {
		ingredientLabel.classList.toggle('cross-out');
	});

	ingredientsContainer.appendChild(ingredientCheckbox);
	ingredientsContainer.appendChild(ingredientLabel);
};

const generateAllIngredients = ingredients => {
	const ingredientsArray = Object.values(ingredients);
	const ingredientsContainer = document.createElement('div');
	ingredientsArray.forEach(ingredient => createIngredientBox(ingredient, ingredientsContainer));
	return ingredientsContainer;
};

export { generateAllIngredients, populateList, deleteRecipe };

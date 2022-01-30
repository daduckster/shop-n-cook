import { createID, deleteRecipe } from '/src/index';
import { recipesInStorage } from '../new-recipe/newRecipeElements.js';
import { createRecipeDOM, recipesContainer } from './recipeItem';

const cleanRecipesList = () => {
	recipesContainer.forEach(container => {
		container.innerHTML = '';
	});
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

export { generateAllIngredients, deleteRecipe, cleanRecipesList };

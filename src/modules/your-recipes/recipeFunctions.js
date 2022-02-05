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
	const ingredientId = `ingredient${createID()}`;

	const ingredientBox = document.createElement('div');
	ingredientBox.classList.add('recipe__ingredients__container__box');

	const ingredientLabel = document.createElement('label');
	ingredientLabel.innerHTML = ingredient;
	ingredientLabel.htmlFor = ingredientId;
	ingredientLabel.classList.add('recipe__ingredients__container__label');

	const ingredientCheckbox = document.createElement('input');
	ingredientCheckbox.setAttribute('type', 'checkbox');
	ingredientCheckbox.id = ingredientId;
	ingredientCheckbox.classList.add('recipe__ingredients__container__checkbox');

	ingredientBox.appendChild(ingredientCheckbox);
	ingredientBox.appendChild(ingredientLabel);
	ingredientsContainer.appendChild(ingredientBox);
};

const generateAllIngredients = ingredients => {
	const ingredientsArray = Object.values(ingredients);
	const ingredientsContainer = document.createElement('div');
	ingredientsArray.forEach(ingredient => createIngredientBox(ingredient, ingredientsContainer));
	return ingredientsContainer;
};

export { generateAllIngredients, deleteRecipe, cleanRecipesList };

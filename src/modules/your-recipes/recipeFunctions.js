import { createID, deleteRecipe } from '/src/index';
import { recipesInStorage } from '../new-recipe/newRecipeElements.js';
import { createRecipeDOM, recipesContainer } from './recipeItem';

let randomNumber = 0;
let checkboxArray = [];
let checkboxStatus = JSON.parse(localStorage.getItem('checkboxStatus')) || [];

const cleanRecipesList = () => {
	recipesContainer.forEach(container => {
		container.innerHTML = '';
	});
};

// INGREDIENT-CHECKBOXES ////////////////////////////////////////////////

const createIngredientBox = (ingredient, ingredientsContainer, id) => {
	const ingredientId = `ingredient${id}-${randomNumber}`;

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
	ingredientCheckbox.classList.add('checkbox');

	ingredientBox.appendChild(ingredientCheckbox);
	ingredientBox.appendChild(ingredientLabel);
	ingredientsContainer.appendChild(ingredientBox);

	randomNumber++;
	// return ingredientId;
};

const generateAllIngredients = (ingredients, id) => {
	randomNumber = 0;
	const ingredientsArray = Object.values(ingredients);
	const ingredientsContainer = document.createElement('div');
	ingredientsArray.forEach(ingredient => {
		createIngredientBox(ingredient, ingredientsContainer, id);
		// const id = createIngredientBox(ingredient, ingredientsContainer);
		// fillCheckboxArray(id);
	});

	return ingredientsContainer;
};

const cleanCheckboxArray = () => {
	checkboxArray = [];
};

const fillCheckboxArray = recipe => {
	// checkboxArray.push([ id, 'unchecked' ]);
	const checkboxes = document.querySelectorAll('.recipe__ingredients__container__checkbox');
	checkboxes.forEach(checkbox => {
		checkboxArray.push([ checkbox.id, 'unchecked' ]);
	});
	setCheckboxLocalStorage();
};

const setCheckboxLocalStorage = () => {
	checkboxStatus = checkboxArray;
	localStorage.setItem('checkboxStatus', JSON.stringify(checkboxStatus));
};

// const cleanCheckboxLocalStorage = () => {
// 	localStorage.removeItem('checkboxStatus', JSON.stringify(checkboxStatus));
// };

const addEventListenersToCheckboxes = () => {
	const checkboxes = document.querySelectorAll('.recipe__ingredients__container__checkbox');
	checkboxes.forEach(checkbox => {
		checkbox.addEventListener('change', () => {
			refreshStatus(checkbox);
		});
	});
};

const refreshStatus = checkbox => {
	const neededCheckbox = checkboxStatus.filter(element => element[0] === checkbox.id);
	if (neededCheckbox[0][1] === 'checked' && neededCheckbox[1][1] === 'checked') {
		neededCheckbox[0][1] = 'unchecked';
		neededCheckbox[1][1] = 'unchecked';
	} else if (neededCheckbox[0][1] === 'unchecked' && neededCheckbox[1][1] === 'unchecked') {
		neededCheckbox[0][1] = 'checked';
		neededCheckbox[1][1] = 'checked';
	}
	localStorage.setItem('checkboxStatus', JSON.stringify(checkboxStatus));

	// console.log(neededCheckbox);
};

export {
	generateAllIngredients,
	deleteRecipe,
	cleanRecipesList,
	addEventListenersToCheckboxes,
	cleanCheckboxArray,
	fillCheckboxArray,
};

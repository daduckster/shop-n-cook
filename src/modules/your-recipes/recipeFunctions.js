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
	// console.log('recipe', id);
	const ingredientId = `ingredient${id}-${randomNumber}`;
	// console.log(ingredientId);

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

const fillCheckboxArray = id => {
	setTimeout(() => {
		// checkboxArray.push([ id, 'unchecked' ]);
		const checkboxes = document.querySelectorAll('.recipe__ingredients__container__checkbox');
		// console.log('new', id);
		checkboxes.forEach(checkbox => {
			// console.log('checkbox', checkbox.id);
			if (checkbox.id.toString().includes(id)) {
				checkboxArray.push([ checkbox.id, 'unchecked' ]);
				// console.log(checkboxArray);
			}
		});
		// checkboxes.forEach(checkbox => {
		// 	checkboxArray.push([ checkbox.id, 'unchecked' ]);
		// });
		setCheckboxLocalStorage();
	}, 400);
};

const setCheckboxLocalStorage = () => {
	checkboxStatus.unshift(checkboxArray);
	localStorage.setItem('checkboxStatus', JSON.stringify(checkboxStatus));
	checkboxArray = [];
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
	// console.log(checkbox.id);
	const neededCheckbox = checkboxStatus.map(element => {
		return element.map(recipe => {
			if (recipe[0] === checkbox.id) {
				// console.log(recipe);
				return recipe;
				// recipe.forEach(r => {
				// 	if (r[1] === 'checked') {
				// 		r[1] = 'unchecked';
				// 	} else if (r[1] === 'unchecked') {
				// 		r[1] = 'checked';
				// 	}
				// });
			}
		});
	});
	console.log(neededCheckbox);
	// if (neededCheckbox[0][1] === 'checked' && neededCheckbox[1][1] === 'checked') {
	// 	neededCheckbox[0][1] = 'unchecked';
	// 	neededCheckbox[1][1] = 'unchecked';
	// } else if (neededCheckbox[0][1] === 'unchecked' && neededCheckbox[1][1] === 'unchecked') {
	// 	neededCheckbox[0][1] = 'checked';
	// 	neededCheckbox[1][1] = 'checked';
	// }
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

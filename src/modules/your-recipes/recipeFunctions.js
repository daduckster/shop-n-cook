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
};

const generateAllIngredients = (ingredients, id) => {
	randomNumber = 0;
	const ingredientsArray = Object.values(ingredients);
	const ingredientsContainer = document.createElement('div');
	ingredientsArray.forEach(ingredient => {
		createIngredientBox(ingredient, ingredientsContainer, id);
	});

	return ingredientsContainer;
};

const cleanCheckboxArray = () => {
	checkboxArray = [];
};

const fillCheckboxArray = id => {
	setTimeout(() => {
		const checkboxes = document.querySelectorAll('.recipe__ingredients__container__checkbox');
		checkboxes.forEach(checkbox => {
			if (checkbox.id.toString().includes(id)) {
				checkboxArray.push([ checkbox.id, 'unchecked' ]);
			}
		});
		setCheckboxLocalStorage();
	}, 400);
};

const setCheckboxLocalStorage = () => {
	checkboxStatus.unshift(checkboxArray);
	localStorage.setItem('checkboxStatus', JSON.stringify(checkboxStatus));
	checkboxArray = [];
};

const addEventListenersToCheckboxes = () => {
	const checkboxes = document.querySelectorAll('.recipe__ingredients__container__checkbox');
	checkboxes.forEach(checkbox => {
		checkbox.addEventListener('change', () => {
			refreshStatus(checkbox);
		});
	});
};

const synchCheckboxes = () => {
	const checkboxes = document.querySelectorAll('.recipe__ingredients__container__checkbox');
	checkboxes.forEach(checkbox => {
		checkboxStatus.forEach(element => {
			element.forEach(ingredient => {
				if (ingredient[0] === checkbox.id) {
					if (ingredient[1] === 'unchecked') {
						checkbox.checked = false;
					} else if (ingredient[1] === 'checked') {
						checkbox.checked = true;
					}
				}
			});
		});
	});
};

const removeCheckboxesFromLocalStorage = recipe => {
	const id = recipe.id;
	for (let i = 0; i < checkboxStatus.length; i++) {
		if (checkboxStatus[i].join('').includes(id)) {
			checkboxStatus.splice(i, 1);
		}
	}

	localStorage.setItem('checkboxStatus', JSON.stringify(checkboxStatus));
};

const refreshStatus = checkbox => {
	const updatedCheckboxes = [ ...checkboxStatus ];

	updatedCheckboxes.forEach(element => {
		element.forEach(ingredient => {
			if (ingredient[0] === checkbox.id) {
				if (ingredient[1] === 'unchecked') {
					ingredient[1] = 'checked';
				} else if (ingredient[1] === 'checked') {
					ingredient[1] = 'unchecked';
				}
			}
		});
	});

	localStorage.setItem('checkboxStatus', JSON.stringify(updatedCheckboxes));
};

export {
	generateAllIngredients,
	deleteRecipe,
	cleanRecipesList,
	addEventListenersToCheckboxes,
	cleanCheckboxArray,
	fillCheckboxArray,
	synchCheckboxes,
	removeCheckboxesFromLocalStorage,
};

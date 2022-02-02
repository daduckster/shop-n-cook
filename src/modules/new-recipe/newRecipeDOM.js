import { ulIngredientContainer, ingredientsArray } from './newRecipeElements.js';
import { deleteIngredient, cleanInputsIngredients } from './newRecipeFunctions.js';
import { createID } from '/src/index';

const createIngredientDOM = newIngredient => {
	const liIngredient = document.createElement('li');
	const imgIngredient = document.createElement('img');
	const pIngredient = document.createElement('p');

	imgIngredient.classList.add('new-recipe__remove-icon');
	pIngredient.classList.add('pIngredient');

	imgIngredient.src = '/dist/assets/icons/icon-remove.svg';
	imgIngredient.alt = 'icon with minus in circle';
	imgIngredient.ariaLabel = 'remove ingredient from the list';

	pIngredient.textContent = `${newIngredient}`;

	liIngredient.id = `${createID()}`;
	liIngredient.appendChild(imgIngredient);
	liIngredient.appendChild(pIngredient);
	ulIngredientContainer.appendChild(liIngredient);

	imgIngredient.addEventListener('click', () => {
		deleteIngredient(liIngredient);
	});

	// ingredientsArray.push(pIngredient);

	cleanInputsIngredients();
};

export { createIngredientDOM };

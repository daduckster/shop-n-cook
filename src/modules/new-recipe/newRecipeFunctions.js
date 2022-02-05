import {
	inputDishName,
	inputIngredients,
	inputWeight,
	inputMeasure,
	inputRecipeText,
	btnNewRecipeSave,
	btnNewRecipeMobile,
	ulIngredientContainer,
	formNewRecipes,
	newRecipeHeader,
	recipesInStorage,
	ingredientsArray,
	assignArrayFactory,
} from './newRecipeElements.js';
import { createIngredientDOM } from './newRecipeDOM.js';
import { createID, updateLocalStorage, saveChangesLocalStorage, populateList } from '/src/index';

const openNewRecipeForm = () => {
	btnNewRecipeMobile.classList.add('hidden');
	formNewRecipes.classList.add('visible');
};

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
	const arrayToDelete = ingredientsArray.find(ingredient => {
		ingredient.id === liIngredient.id;
	});
};

const cleanInputsIngredients = () => {
	inputIngredients.value = '';
	inputWeight.value = '';
	inputMeasure.value = '';
};

// ADD NEW RECIPE /////////////////////////////////////////////////

const addNewRecipe = e => {
	e.preventDefault();
	if (btnNewRecipeSave.value === 'Save Changes') {
		saveEditingChanges(e);
		return;
	}
	if (!inputDishName.value) {
		inputDishName.classList.add('js-empty-field');
		if (formNewRecipes.classList.contains('visible')) {
			formNewRecipes.classList.remove('visible');
			btnNewRecipeMobile.classList.remove('hidden');
		}
		return;
	} else if (inputDishName.classList.contains('js-empty-field')) {
		inputDishName.classList.remove('js-empty-field');
	}

	if (inputIngredients.value !== '') {
		addNewIngredient(e);
		return;
	} else {
		const newRecipe = createRecipeFactory();
		updateLocalStorage(newRecipe);
		cleanInputsAndLists();
		btnNewRecipeMobile.classList.remove('hidden');
		formNewRecipes.classList.remove('visible');
		populateList();
		openSavedRecipe(newRecipe);
	}
};

const openSavedRecipe = recipe => {
	const recipeElement = document.querySelectorAll(`#${recipe.id}`);
	recipeElement.forEach(element => {
		element.setAttribute('open', true);
	});
};

const createRecipeFactory = (name, ingredients, recipeText, id) => {
	const ingredientsForArray = document.querySelectorAll('.pIngredient');
	ingredientsForArray.forEach(ingredient => {
		const text = ingredient.textContent;
		ingredientsArray.push(text);
	});
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

// EDIT RECIPE /////////////////////////////////////////////////

const enableEditingForm = recipe => {
	newRecipeHeader.textContent = 'Edit Recipe';
	if (!formNewRecipes.classList.contains('visible')) {
		formNewRecipes.classList.add('visible');
		btnNewRecipeMobile.classList.add('hidden');
	}
	btnNewRecipeSave.value = 'Save Changes';
	btnNewRecipeSave.id = `${recipe.id}`;
	inputDishName.value = `${recipe.name}`;
	const ingredientList = Object.values(recipe.ingredients);
	for (let i = 0; i < ingredientList.length; i++) {
		let ingredient = ingredientList[i];
		createIngredientDOM(ingredient);
	}
	inputRecipeText.value = `${recipe.recipeText}`;
};

const saveEditingChanges = e => {
	e.preventDefault();

	if (!inputDishName.value) {
		inputDishName.classList.add('js-empty-field');
		if (formNewRecipes.classList.contains('visible')) {
			formNewRecipes.classList.remove('visible');
			btnNewRecipeMobile.classList.remove('hidden');
		}
		return;
	} else if (inputDishName.classList.contains('js-empty-field')) {
		inputDishName.classList.remove('js-empty-field');
	}

	if (inputIngredients.value !== '') {
		addNewIngredient(e);
		return;
	} else {
		newRecipeHeader.textContent = 'New Recipe';
		btnNewRecipeSave.value = '+ Add new Recipe';
		const updatedRecipe = createRecipeFactory();
		saveChangesLocalStorage(updatedRecipe);
		cleanInputsAndLists();
		btnNewRecipeMobile.classList.remove('hidden');
		formNewRecipes.classList.remove('visible');
		populateList();
		openSavedRecipe(updatedRecipe);
	}
};

export {
	addNewIngredient,
	addNewRecipe,
	deleteIngredient,
	cleanInputsIngredients,
	openNewRecipeForm,
	enableEditingForm,
	openSavedRecipe,
};

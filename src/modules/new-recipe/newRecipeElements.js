import { addNewIngredient, addNewRecipe, openNewRecipeForm } from './newRecipeFunctions';
import { populateList } from '/src/index.js';

const inputDishName = document.querySelector('.js-input-dish-name');
const inputIngredients = document.querySelector('.js-input-ingredients');
const inputWeight = document.querySelector('.js-input-weight');
const inputMeasure = document.querySelector('.js-input-measure');
const inputRecipeText = document.querySelector('.js-input-recipe');
const inputCategory = document.querySelector('.js-input-category');

const btnAdd = document.querySelector('.js-btn-add');
const btnNewRecipeSave = document.querySelector('.js-btn-new-recipe-save');
const btnNewRecipeMobile = document.querySelector('.js-btn-new-recipe-mobile');

const ulIngredientContainer = document.querySelector('.js-ul-ingredient-container');
const formNewRecipes = document.querySelector('.new-recipe');
const newRecipeHeader = document.querySelector('.heading--new-recipe');

let ingredientsArray = [];

btnNewRecipeMobile.addEventListener('click', openNewRecipeForm);

btnAdd.addEventListener('click', e => {
	addNewIngredient(e);
});

btnAdd.addEventListener('keypress', e => {
	if (e.keyCode == 13) {
		addNewRecipe(e);
		populateList();
	}
});

formNewRecipes.addEventListener('submit', e => {
	addNewRecipe(e);
	populateList();
});

btnNewRecipeSave.addEventListener('click', e => {
	addNewRecipe(e);
	populateList();
});
// btnNewRecipeSave.addEventListener('submit', populateRecipesList);
// btnNewRecipeSave.addEventListener('submit', cleanInputFields);

const assignArrayFactory = array => {
	ingredientsArray = array;
};

export {
	inputDishName,
	inputIngredients,
	inputWeight,
	inputMeasure,
	inputRecipeText,
	inputCategory,
	btnAdd,
	btnNewRecipeSave,
	btnNewRecipeMobile,
	ulIngredientContainer,
	formNewRecipes,
	newRecipeHeader,
	ingredientsArray,
};

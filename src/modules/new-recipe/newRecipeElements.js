import { addNewIngredient, addNewRecipe } from './newRecipeFunctions';

const inputDishName = document.querySelector('.js-input-dish-name');
const inputIngredients = document.querySelector('.js-input-ingredients');
const inputWeight = document.querySelector('.js-input-weight');
const inputMeasure = document.querySelector('.js-input-measure');
const inputRecipeText = document.querySelector('.js-input-recipe');
const inputCategory = document.querySelector('.js-input-category');

const btnAdd = document.querySelector('.js-btn-add');
const btnNewRecipeSave = document.querySelector('.js-btn-new-recipe-save');

const ulIngredientContainer = document.querySelector('.js-ul-ingredient-container');

let recipesInStorage = JSON.parse(localStorage.getItem('recipesInStorage')) || [];
let ingredientsArray = [];

btnAdd.addEventListener('click', e => {
	addNewIngredient(e);
});
btnNewRecipeSave.addEventListener('click', e => {
	addNewRecipe(e);
});
// btnNewRecipeSave.addEventListener('submit', populateRecipesList);
// btnNewRecipeSave.addEventListener('submit', cleanInputFields);

export {
	inputDishName,
	inputIngredients,
	inputWeight,
	inputMeasure,
	inputRecipeText,
	inputCategory,
	btnAdd,
	btnNewRecipeSave,
	ulIngredientContainer,
	recipesInStorage,
	ingredientsArray,
};

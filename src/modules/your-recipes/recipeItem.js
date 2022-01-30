import { recipesInStorage } from '../new-recipe/newRecipeElements.js';

const recipesContainer = document.querySelectorAll('.main-recipes__recipes-container');

const createRecipeDOM = () => {
	const recipeDetails = document.createElement('details');
	const recipeSummary = document.createElement('summary');
	const recipeSummaryP = document.createElement('p');
	const recipeSummaryImg = document.createElement('img');

	const ingredientsForm = document.createElement('form');
	const ingredientsHeader = document.createElement('header');
	const ingredientsCheckbox = document.createElement('checkbox');
	const ingredientsLabelCheckbox = document.createElement('label');

	const instructionsSection = document.createElement('section');
	const instructionsHeader = document.createElement('header');
	const instructionsP = document.createElement('p');

	const recipeBtnContainer = document.createElement('div');
	const recipeSendToTopBtn = document.createElement('button');
	const recipeEditBtn = document.createElement('button');

	// CLASSES ////////////////////////////////////////////////

	recipeDetails.classList.add('recipe');
	recipeSummaryP.classList.add('section-heading');
	recipeSummaryImg.classList.add('dropdown--closed');

	ingredientsForm.classList.add('recipe__ingredients');

	instructionsSection.classList.add('recipe__instructions');

	recipeBtnContainer.classList.add('recipe__buttons');
	recipeSendToTopBtn.classList.add('btn');
	recipeSendToTopBtn.classList.add('btn--send-to-top');
	recipeEditBtn.classList.add('recipe__buttons__link');

	// CONTENTS ////////////////////////////////////////////////

	recipeSummaryP.textContent = `${recipe.name}`;

	ingredientsHeader.textContent = 'Ingredients:';
};

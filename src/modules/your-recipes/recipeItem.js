import { recipesInStorage } from '../new-recipe/newRecipeElements.js';
import { generateAllIngredients, deleteRecipe } from './recipeFunctions';

const recipesContainer = document.querySelectorAll('.main-recipes__recipes-container');

const createRecipeDOM = recipe => {
	const recipeDetails = document.createElement('details');

	const recipeSummary = document.createElement('summary');
	const recipeSummaryP = document.createElement('p');
	const recipeSummaryImg = document.createElement('img');

	const ingredientsForm = document.createElement('form');
	const ingredientsHeader = document.createElement('header');
	const ingredientsHeaderText = document.createElement('h3');
	const ingredientsContainer = generateAllIngredients(recipe.ingredients);

	const instructionsSection = document.createElement('section');
	const instructionsHeader = document.createElement('header');
	const instructionsHeaderText = document.createElement('h3');
	const instructionsP = document.createElement('p');

	const recipeBtnContainer = document.createElement('div');
	const recipeSendToTopBtn = document.createElement('button');
	const recipeEditBtn = document.createElement('img');
	const recipeDeleteBtn = document.createElement('img');

	// CLASSES ////////////////////////////////////////////////

	recipeDetails.classList.add('recipe');
	recipeSummaryP.classList.add('section-heading');
	recipeSummaryImg.classList.add('dropdown--closed');

	ingredientsForm.classList.add('recipe__ingredients');

	instructionsSection.classList.add('recipe__instructions');

	recipeBtnContainer.classList.add('recipe__buttons');
	recipeSendToTopBtn.classList.add('btn');
	recipeSendToTopBtn.classList.add('btn--send-to-top');

	// CONTENTS ////////////////////////////////////////////////

	recipeDetails.id = recipe.id;

	recipeSummaryP.textContent = recipe.name;
	recipeSummaryImg.alt = 'icon with arrow to the right';

	ingredientsHeaderText.textContent = 'Ingredients:';

	instructionsHeaderText.textContent = 'Recipe:';

	instructionsP.textContent = recipe.recipeText;

	recipeSendToTopBtn.textContent = 'Send to Top';
	recipeSendToTopBtn.ariaLabel = 'button to pin recipe to the top of your list';
	recipeEditBtn.src = '/dist/assets/icons/icon-edit.svg';
	recipeDeleteBtn.src = '/dist/assets/icons/icon-delete.svg';

	// APPENDING ////////////////////////////////////////////////

	recipeSummary.appendChild(recipeSummaryP);
	recipeSummary.appendChild(recipeSummaryImg);

	ingredientsHeader.appendChild(ingredientsHeaderText);
	ingredientsForm.appendChild(ingredientsHeader);
	ingredientsForm.appendChild(ingredientsContainer);

	instructionsHeader.appendChild(instructionsHeaderText);
	instructionsSection.appendChild(instructionsHeader);
	instructionsSection.appendChild(instructionsP);

	recipeBtnContainer.appendChild(recipeSendToTopBtn);
	recipeBtnContainer.appendChild(recipeEditBtn);
	recipeBtnContainer.appendChild(recipeDeleteBtn);

	recipeDetails.appendChild(recipeSummary);
	recipeDetails.appendChild(ingredientsForm);
	recipeDetails.appendChild(instructionsSection);
	recipeDetails.appendChild(recipeBtnContainer);

	recipesContainer.forEach(container => {
		container.appendChild(recipeDetails);
	});

	// EVENTS ////////////////////////////////////////////////

	recipeDeleteBtn.addEventListener('click', () => {
		recipesContainer.forEach(container => {
			container.removeChild(recipeDetails);
		});
		// deleteRecipe(recipe);
	});
};

export { createRecipeDOM, recipesContainer };

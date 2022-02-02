import { recipesInStorage } from '../new-recipe/newRecipeElements.js';
import { generateAllIngredients, deleteRecipe } from './recipeFunctions';
import { editRecipe } from '/src/index';

const recipesContainer = document.querySelectorAll('.main-recipes__recipes-container');
const recipesContainerMobile = document.querySelector('.recipes-container-mobile');
const recipesContainerDesktop = document.querySelector('.recipes-container-desktop');

const createRecipeMobileDOM = recipe => {
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
	ingredientsContainer.classList.add('recipe__ingredients__container');

	instructionsSection.classList.add('recipe__instructions');

	recipeBtnContainer.classList.add('recipe__buttons');
	recipeSendToTopBtn.classList.add('btn');
	recipeSendToTopBtn.classList.add('btn--send-to-top');

	recipeSummary.classList.add(`summary${recipe.id}`);
	recipeSummaryImg.classList.add(`summaryImg${recipe.id}`);
	recipeSendToTopBtn.classList.add(`toTopBtn${recipe.id}`);
	recipeEditBtn.classList.add(`btnEdit${recipe.id}`);
	recipeDeleteBtn.classList.add(`btnDelete${recipe.id}`);

	// CONTENTS ////////////////////////////////////////////////

	recipeDetails.id = recipe.id;

	recipeSummaryP.textContent = recipe.name;
	recipeSummaryImg.alt = 'icon with arrow';

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

	let newRecipeDetails = recipeDetails.cloneNode(true);

	recipesContainerMobile.appendChild(recipeDetails);
	recipesContainerDesktop.appendChild(newRecipeDetails);

	// EVENTS ////////////////////////////////////////////////

	const summary = document.querySelectorAll(`.summary${recipe.id}`);
	const summaryImg = document.querySelectorAll(`.summaryImg${recipe.id}`);
	const toTopBtn = document.querySelectorAll(`.toTopBtn${recipe.id}`);
	const editBtn = document.querySelectorAll(`.btnEdit${recipe.id}`);
	const deleteBtn = document.querySelectorAll(`.btnDelete${recipe.id}`);
	const checkbox = document.querySelectorAll(`.checkbox${recipe.id}`);
	const checkboxLabel = document.querySelectorAll(`.checkboxLabel${recipe.id}`);

	summary.forEach(summary => {
		summary.addEventListener('click', () => {
			summaryImg.forEach(summaryImg => {
				summaryImg.classList.toggle('dropdown--opened');
			});
		});
	});

	checkbox.forEach(checkbox => {
		checkbox.addEventListener('change', () => {
			checkboxLabel.forEach(label => {
				label.classList.toggle('cross-out');
			});
		});
	});

	deleteBtn.forEach(btn => {
		btn.addEventListener('click', () => {
			if (recipesContainerMobile.contains(recipeDetails)) {
				recipesContainerMobile.removeChild(recipeDetails);
			}

			if (recipesContainerDesktop.contains(newRecipeDetails)) {
				recipesContainerDesktop.removeChild(newRecipeDetails);
			}

			deleteRecipe(recipe);
		});
	});

	editBtn.forEach(btn => {
		btn.addEventListener('click', () => {
			editRecipe(recipe);
		});
	});

	toTopBtn.forEach(btn => {
		btn.addEventListener('click', () => {
			sendToTop();
		});
	});
};

export { createRecipeMobileDOM, recipesContainer };

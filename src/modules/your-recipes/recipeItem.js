const recipesContainer = document.querySelectorAll('.main-recipes__recipes-container');

const createRecipeDOM = () => {
	const recipeDetails = document.createElement('details');
	const recipeSummary = document.createElement('summary');

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
};

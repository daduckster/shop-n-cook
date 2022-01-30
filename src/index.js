import '../styles/main.scss';
import * as newRecipeElements from './modules/new-recipe/newRecipeElements';
import * as newRecipeFunctions from './modules/new-recipe/newRecipeFunctions';
import * as recipeItem from './modules/your-recipes/recipeItem';
import * as recipeFunctions from './modules/your-recipes/recipeFunctions';

let recipesInStorage = JSON.parse(localStorage.getItem('recipesInStorage')) || [];

function createID() {
	const randomID = Math.floor(Math.random() * 1000000000000000000000);
	return randomID;
}

const populateList = () => {
	recipeFunctions.cleanRecipesList();
	recipesInStorage.map(recipe => {
		recipeItem.createRecipeDOM(recipe);
	});
};

const deleteRecipe = recipe => {
	const filteredRecipes = recipesInStorage.filter(recipeInStorage => recipeInStorage.id !== recipe.id);
	recipesInStorage = filteredRecipes;
	localStorage.setItem('recipesInStorage', JSON.stringify(recipesInStorage));
	populateList();
};

const updateLocalStorage = newRecipe => {
	recipesInStorage.unshift(newRecipe);
	localStorage.setItem('recipesInStorage', JSON.stringify(recipesInStorage));
	newRecipeElements.ingredientsArray.length = 0;
};

populateList();

export { createID, deleteRecipe, updateLocalStorage, populateList };
// console.log(recipeItem.recipesContainer);

// console.log(newRecipeElements.inputDishName);

// newRecipeFunctions.addNewIngredient();

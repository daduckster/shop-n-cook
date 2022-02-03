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
		recipeItem.createRecipeMobileDOM(recipe);
	});
};

const editRecipe = recipe => {
	const recipeToEdit = recipesInStorage.find(recipeInStorage => recipeInStorage.id === recipe.id);
	newRecipeFunctions.enableEditingForm(recipeToEdit);
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

const saveChangesLocalStorage = updatedRecipe => {
	const recipeToChange = recipesInStorage.findIndex(recipe => recipe.id === newRecipeElements.btnNewRecipeSave.id);
	recipesInStorage[recipeToChange].name = updatedRecipe.name;
	recipesInStorage[recipeToChange].ingredients = updatedRecipe.ingredients;
	recipesInStorage[recipeToChange].recipeText = updatedRecipe.recipeText;
	recipesInStorage[recipeToChange].id = updatedRecipe.id;
	localStorage.setItem('recipesInStorage', JSON.stringify(recipesInStorage));
	newRecipeElements.ingredientsArray.length = 0;
};

populateList();

export { createID, deleteRecipe, updateLocalStorage, populateList, editRecipe, saveChangesLocalStorage };

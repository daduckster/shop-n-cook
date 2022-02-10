import '../styles/main.scss';
import * as newRecipeElements from './modules/new-recipe/newRecipeElements';
import * as newRecipeFunctions from './modules/new-recipe/newRecipeFunctions';
import * as recipeItem from './modules/your-recipes/recipeItem';
import * as recipeFunctions from './modules/your-recipes/recipeFunctions';
import * as searchFunctions from './modules/search/searchFunctions';

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
	// recipeFunctions.fillCheckboxArray();
	recipeFunctions.addEventListenersToCheckboxes();
};

const editRecipe = recipe => {
	const recipeToEdit = recipesInStorage.find(recipeInStorage => recipeInStorage.id === recipe.id);
	newRecipeFunctions.enableEditingForm(recipeToEdit);
};

const deleteRecipe = recipe => {
	const filteredRecipes = recipesInStorage.filter(recipeInStorage => recipeInStorage.id !== recipe.id);
	recipesInStorage = filteredRecipes;
	localStorage.setItem('recipesInStorage', JSON.stringify(recipesInStorage));
	if (searchFunctions.searchMobile.value !== '') {
		searchFunctions.keywordSearch(e);
	}
	populateList();
};

const sendToTop = recipe => {
	const filteredRecipes = recipesInStorage.filter(recipeInStorage => recipeInStorage.id !== recipe.id);
	recipesInStorage = filteredRecipes;
	recipesInStorage.unshift(recipe);
	localStorage.setItem('recipesInStorage', JSON.stringify(recipesInStorage));
	populateList();
	newRecipeFunctions.openSavedRecipe(recipe);
};

const updateLocalStorage = newRecipe => {
	recipesInStorage.unshift(newRecipe);
	localStorage.setItem('recipesInStorage', JSON.stringify(recipesInStorage));
	newRecipeElements.ingredientsArray.length = 0;
	recipeFunctions.fillCheckboxArray(newRecipe.id);
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

const searchInStorage = (keyword, id, e) => {
	e.preventDefault();

	if (id === 'withoutIngredients') {
		const searchedRecipes = recipesInStorage.filter(recipe => recipe.name.toLowerCase().includes(keyword.trim()));
		recipeFunctions.cleanRecipesList();
		searchedRecipes.map(recipe => recipeItem.createRecipeMobileDOM(recipe));
		return null;
	} else if (id === 'withIngredients') {
		const searchedRecipes = recipesInStorage.filter(recipe => {
			if (recipe.name.toLowerCase().includes(keyword.trim())) return recipe;

			for (const key in recipe.ingredients) {
				if (recipe.ingredients[key].toLowerCase().includes(keyword.trim())) return recipe;
			}
		});
		recipeFunctions.cleanRecipesList();
		searchedRecipes.map(recipe => recipeItem.createRecipeMobileDOM(recipe));
	}
};

populateList();

export {
	createID,
	deleteRecipe,
	updateLocalStorage,
	populateList,
	editRecipe,
	saveChangesLocalStorage,
	searchInStorage,
	sendToTop,
};

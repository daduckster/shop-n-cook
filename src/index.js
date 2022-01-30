import '../styles/main.scss';
import * as newRecipeElements from './modules/new-recipe/newRecipeElements';
import * as newRecipeFunctions from './modules/new-recipe/newRecipeFunctions';
import * as recipeItem from './modules/your-recipes/recipeItem';
import * as recipeFunctions from './modules/your-recipes/recipeFunctions';

recipeFunctions.populateList();

function createID() {
	const randomID = Math.floor(Math.random() * 1000000000000000000000);
	return randomID;
}

export { createID };
// console.log(recipeItem.recipesContainer);

// console.log(newRecipeElements.inputDishName);

// newRecipeFunctions.addNewIngredient();

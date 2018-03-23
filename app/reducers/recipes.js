 import createReducer from '../lib/createReducer'
 import * as types from '../actions/types'

 export const searchedRecipes = createReducer({}, {
  [types.SET_SEARCHED_RECIPES](state =[], action) {
    let newState = {}
    action.recipes.forEach((recipe) => {
      newState[recipe.id] = recipe;
    });
    return newState;
  },
});

 export const recipeCount = createReducer(0,{
   [types.SET_SEARCHED_RECIPES](state=[], action){
     return action.recipes.length;
   },
   [types.SET_SEARCHED_RECIPES_TYPE](state=[], action){
     return action.recipes.length;
   },
   [types.RECIPE_COUNT](state, action){
     return state+1;
   }
 });

 export const responseRecipe = createReducer({}, {
   [types.GET_RESPONSE](state=[], action) {
     return action.responses;
   }
 });

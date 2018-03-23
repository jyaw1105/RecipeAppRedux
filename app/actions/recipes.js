import * as types from './types'
import Api from '../lib/Api'

export function fetchRecipesByType(type){
  return (dispatch, getState) => {
    const params = {type: type}
    return Api.post(`/select_RecipeByType.php`,params).then(resp => {
      dispatch(setSearchedRecipes({recipes: resp.recipe}));
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}
export function fetchRecipes(){
  return (dispatch, getState) => {
    return Api.get(`/selectall_recipe.php`).then(resp => {
      dispatch(setSearchedRecipes({recipes: resp.recipe}));
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

export function searchRecipe(ingredient){
  return (dispatch, getState) => {
    const params = {ingredient: ingredient}
    return Api.post(`/search_Recipe.php`,params).then(resp => {
      dispatch(setSearchedRecipes({recipes: resp.recipe}));
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

export function setSearchedRecipes({recipes}){
  return {
    type: types.SET_SEARCHED_RECIPES,
    recipes,
  }
}

export function RecipeCount(){
  return {
    type : types.RECIPE_COUNT,
  }
}
export function addRecipes(name, ingredient, step, type){
  return (dispatch, getState) => {
    const params = {name: name, ingredient: ingredient, step: step,type: type}
    return Api.post(`/insert_Recipe.php`, params).then(resp => {
      dispatch(getResponse({responses: resp}));
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

export function deleteRecipes(id){
  return (dispatch, getState) => {
    const params = {id:id}
    return Api.post('/delete_Recipe.php',params).then(resp => {
      dispatch(getResponse({responses:resp}));
    }).catch((ex)=>{
      console.log(ex);
    });
  }
}
export function editRecipes(id, name, ingredient, step, type){
  return (dispatch, getState) => {
    const params = {id:id, name:name, ingredient:ingredient, step:step, type:type}
    return Api.post('/edit_Recipe.php',params).then(resp => {
      dispatch(getResponse({responses:resp}));
    }).catch((ex)=>{
      console.log(ex);
    });
  }
}
export function getResponse({responses}){
  return{
    type: types.GET_RESPONSE,
    responses,
  }
}

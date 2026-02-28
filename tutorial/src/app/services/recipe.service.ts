import { Injectable, signal } from '@angular/core';
import { MOCK_RECIPES } from '../mock-recipes';
import { RecipeModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  readonly allRecipes = signal<RecipeModel[]>(MOCK_RECIPES);
  readonly selectedRecipe = signal<RecipeModel | undefined>(undefined);

  switchRecipe = (newRecipeId: number): void => {
    this.selectedRecipe.set(MOCK_RECIPES[newRecipeId - 1]);
  };

  getRecipeById = (recipeId: number): RecipeModel | undefined => {
    return MOCK_RECIPES.find(recipe => recipe.id === recipeId);
  }
}

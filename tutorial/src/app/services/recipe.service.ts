import { Injectable, signal } from '@angular/core';
import { MOCK_RECIPES } from '../mock-recipes';
import { RecipeModel, Ingredient } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  allRecipes = signal<RecipeModel[]>(MOCK_RECIPES);
  readonly selectedRecipe = signal<RecipeModel | undefined>(undefined);

  getRecipeById = (recipeId: string): RecipeModel | undefined => {
    return this.allRecipes().find(recipe => recipe.id === recipeId);
  }

  addRecipe = (id: string, name: string, description: string, imgUrl: string, ingredients: Ingredient[]) => {
    const newRecipe: RecipeModel = { id, name, description, imgUrl, ingredients };
    this.allRecipes.update((currentRecipes) => [...currentRecipes, newRecipe]);
  }
}

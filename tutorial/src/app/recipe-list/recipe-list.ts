import { Component, signal } from '@angular/core';
import { RecipeModel } from '../models';
import { MOCK_RECIPES } from '../mock-recipes';
import { RecipeDetail } from '../recipe-detail/recipe-detail';
import { RecipeCard } from '../recipe-card/recipe-card';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeDetail, RecipeCard],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export class RecipeList {
  protected readonly allRecipes = signal<RecipeModel[]>(MOCK_RECIPES);
  protected readonly selectedRecipe = signal<RecipeModel>(MOCK_RECIPES[1]);

  protected switchRecipe(newRecipeId: number): void {
    this.selectedRecipe.set(MOCK_RECIPES[newRecipeId - 1]);
  }
}

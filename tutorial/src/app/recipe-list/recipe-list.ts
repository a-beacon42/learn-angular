import { Component, inject } from '@angular/core';
import { RecipeDetail } from '../recipe-detail/recipe-detail';
import { RecipeCard } from '../recipe-card/recipe-card';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeDetail, RecipeCard],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export class RecipeList {
  private readonly recipeService = inject(RecipeService);
  allRecipes = this.recipeService.allRecipes;
  selectedRecipe = this.recipeService.selectedRecipe;
  switchRecipe = this.recipeService.switchRecipe;
}

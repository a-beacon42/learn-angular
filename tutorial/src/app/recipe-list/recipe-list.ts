import { Component, inject } from '@angular/core';
import { RecipeCard } from '../recipe-card/recipe-card';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeCard],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export class RecipeList {
  private readonly recipeService = inject(RecipeService);
  allRecipes = this.recipeService.allRecipes;
  selectedRecipe = this.recipeService.selectedRecipe;
}

import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipeModel } from './models';
import { MOCK_RECIPES } from './mock-recipes';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal<string>('My Recipe Box');

  protected readonly allRecipes = signal<RecipeModel[]>(MOCK_RECIPES);
  protected readonly selectedRecipe = signal<RecipeModel>(MOCK_RECIPES[1]);
  protected readonly servings = signal<number>(1);

  protected readonly adjustedIngredients = computed(() => (
    this.selectedRecipe().ingredients.map(ingredient => ({ ...ingredient, quantity: ingredient.quantity * this.servings() }))
  )
  );

  protected switchRecipe(newRecipeId: number): void {
    this.selectedRecipe.set(MOCK_RECIPES[newRecipeId - 1]);
  }

  protected updateServings(servingsChange: number): void {
    if (this.servings() === 1 && servingsChange === -1)
      return;
    else
      this.servings.update(servings => servings + servingsChange);
  }
}

import { Component, input, signal, computed, inject } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  imports: [RouterLink],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetail {
  recipeService = inject(RecipeService);
  recipeId = input<string>();

  protected readonly recipe = computed(() => {
    const id = this.recipeId();
    return id ? this.recipeService.getRecipeById(+id) : undefined;
  });

  protected readonly servings = signal<number>(1);

  protected readonly adjustedIngredients = computed(() => {
    const r = this.recipe();
    return r ? r.ingredients.map(ingredient => ({ ...ingredient, quantity: ingredient.quantity * this.servings() })) : [];
  }
  );

  protected updateServings(servingsChange: number): void {
    if (this.servings() === 1 && servingsChange === -1)
      return;
    else
      this.servings.update(servings => servings + servingsChange);
  }
}

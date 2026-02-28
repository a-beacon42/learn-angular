import { Component, input, signal, computed } from '@angular/core';
import { RecipeModel } from '../models'

@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetail {
  recipe = input.required<RecipeModel>();
  protected readonly servings = signal<number>(1);

  protected readonly adjustedIngredients = computed(() => (
    this.recipe().ingredients.map(ingredient => ({ ...ingredient, quantity: ingredient.quantity * this.servings() }))
  )
  );

  protected updateServings(servingsChange: number): void {
    if (this.servings() === 1 && servingsChange === -1)
      return;
    else
      this.servings.update(servings => servings + servingsChange);
  }
}

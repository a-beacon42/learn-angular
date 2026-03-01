import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { RecipeService } from '../services/recipe.service';
import { Ingredient } from '../models';

@Component({
  selector: 'app-add-recipe',
  imports: [ReactiveFormsModule, MatButtonModule],
  templateUrl: './add-recipe.html',
  styleUrl: './add-recipe.scss',
})
export class AddRecipe {
  private readonly fb = inject(FormBuilder);
  private readonly recipeService = inject(RecipeService);

  protected readonly ingredientForm = this.fb.group({
    name: this.fb.nonNullable.control('', Validators.required),
    quantity: this.fb.nonNullable.control(1, Validators.required),
    unit: this.fb.nonNullable.control(''),
  });

  protected readonly recipeForm = this.fb.group({
    name: this.fb.nonNullable.control('', Validators.required),
    description: this.fb.nonNullable.control(''),
    imgUrl: this.fb.nonNullable.control(''),
    ingredients: this.fb.nonNullable.control<Ingredient[]>([], Validators.required),
  });

  protected onAddIngredient(): void {
    if (this.ingredientForm.valid) {
      const current = this.recipeForm.controls.ingredients.value ?? [];
      const newIngredient = this.ingredientForm.getRawValue();
      this.recipeForm.controls.ingredients.setValue([...current, newIngredient]);
      this.ingredientForm.reset();
    }
  };

  protected onSubmit(): void {
    const uuid = crypto.randomUUID();
    if (this.recipeForm.valid) {
      const { name, description, imgUrl, ingredients } = this.recipeForm.value;
      this.recipeService.addRecipe(uuid, name!, description!, imgUrl!, ingredients!);
      this.recipeForm.reset();
    }
  }
}

import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { recipeNameValidator } from './validators/recipe-name.validator';
import { uniqueRecipeNameValidator } from './validators/unique-recipe-name.validator';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-form.component.html',
})
export class RecipeFormComponent {
  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.group({
    name: this.fb.control('', {
      validators: [Validators.required, recipeNameValidator()],
      asyncValidators: [uniqueRecipeNameValidator()],
      updateOn: 'change', // BUG: chatty async validation.
    }),
    servings: this.fb.control(0, [Validators.required]), // BUG: min not enforced.
    ingredients: this.fb.array([this.fb.control('')]), // BUG: required missing.
  });

  protected get ingredients(): FormArray {
    return this.form.controls.ingredients;
  }

  protected addIngredient(): void {
    this.ingredients.push(this.fb.control(''));
  }

  protected submit(): void {
    console.log(this.form.value);
  }
}

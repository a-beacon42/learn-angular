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
      updateOn: 'blur',
    }),
    servings: this.fb.control(2, [Validators.required, Validators.min(1)]),
    ingredients: this.fb.array([
      this.fb.control('', Validators.required),
      this.fb.control('', Validators.required),
    ]),
  });

  protected get ingredients(): FormArray {
    return this.form.controls.ingredients;
  }

  protected addIngredient(): void {
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  protected hasNameError(): boolean {
    const control = this.form.controls.name;
    return control.touched && control.invalid;
  }

  protected submit(): void {
    if (this.form.invalid || this.form.pending) {
      return;
    }

    console.log(this.form.value);
  }
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function recipeNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '').trim();

    if (value.length < 3) {
      return { minRecipeNameLength: { required: 3, actual: value.length } };
    }

    if (!/^[a-zA-Z0-9\s-]+$/.test(value)) {
      return { invalidRecipeNameChars: true };
    }

    return null;
  };
}

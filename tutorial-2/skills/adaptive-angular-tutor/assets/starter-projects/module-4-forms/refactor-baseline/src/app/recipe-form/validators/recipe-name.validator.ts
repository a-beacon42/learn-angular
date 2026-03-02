import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function recipeNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '').trim();

    if (value.length === 0) {
      return { nameRequired: true };
    }

    if (value.length < 3) {
      return { minRecipeNameLength: { required: 3, actual: value.length } };
    }

    return null;
  };
}

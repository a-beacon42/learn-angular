import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

const RESERVED_NAMES = new Set(['omelette', 'pancakes']);

export function uniqueRecipeNameValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = String(control.value ?? '').trim().toLowerCase();

    return of(value).pipe(
      delay(150),
      map((candidate) =>
        RESERVED_NAMES.has(candidate) ? { recipeNameTaken: true } : null,
      ),
    );
  };
}

import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export function uniqueRecipeNameValidator(): AsyncValidatorFn {
  return (_control: AbstractControl): Observable<ValidationErrors | null> => {
    return new Observable(() => {
      // BUG: observable never emits or completes, form stays pending.
    });
  };
}

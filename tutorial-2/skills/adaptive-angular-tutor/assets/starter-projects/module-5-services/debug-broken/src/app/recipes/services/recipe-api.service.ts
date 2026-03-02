import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';
import { RecipeDto } from '../models/recipe.dto';

@Injectable({ providedIn: 'root' })
export class RecipeApiService {
  fetchRecipes(): Observable<RecipeDto[]> {
    const dto: RecipeDto[] = [
      { recipe_id: 1, recipe_name: 'Pasta', prep_minutes: 20 },
      { recipe_id: 2, recipe_name: 'Soup', prep_minutes: 30 },
    ];

    return of(dto).pipe(
      delay(200),
      mergeMap((items) =>
        items.length > 0 ? of(items) : throwError(() => new Error('No data')),
      ),
    );
  }
}

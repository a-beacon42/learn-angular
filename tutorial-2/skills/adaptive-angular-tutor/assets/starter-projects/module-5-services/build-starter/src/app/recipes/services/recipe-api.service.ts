import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { RecipeDto } from '../models/recipe.dto';
import { Recipe } from '../models/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeApiService {
  fetchRecipes(): Observable<Recipe[]> {
    const dto: RecipeDto[] = [
      { recipe_id: 1, recipe_name: 'Pasta', prep_minutes: 20 },
      { recipe_id: 2, recipe_name: 'Soup', prep_minutes: 30 },
    ];

    return of(dto).pipe(
      delay(200),
      map((items) =>
        items.map((item) => ({
          id: item.recipe_id,
          name: item.recipe_name,
          prepMinutes: item.prep_minutes,
        })),
      ),
    );
  }
}

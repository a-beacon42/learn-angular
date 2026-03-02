import { Injectable, computed, inject, signal } from '@angular/core';
import { RecipeDto } from '../models/recipe.dto';
import { RecipeApiService } from './recipe-api.service';

@Injectable({ providedIn: 'root' })
export class RecipeStoreService {
  private readonly api = inject(RecipeApiService);

  private readonly recipes = signal<RecipeDto[]>([]); // BUG: DTO leaks to UI boundary.
  private readonly loading = signal(false);
  private readonly error = signal<string | null>(null);

  readonly vm = computed(() => ({
    recipes: this.recipes(),
    loading: this.loading(),
    error: this.error(),
  }));

  load(): void {
    this.loading.set(true);
    this.error.set(null);

    this.api.fetchRecipes().subscribe({
      next: (recipes) => {
        const current = this.recipes();
        recipes.forEach((recipe) => current.push(recipe)); // BUG: mutable shared update.
        this.recipes.set(current);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false); // BUG: error state swallowed.
      },
    });
  }
}

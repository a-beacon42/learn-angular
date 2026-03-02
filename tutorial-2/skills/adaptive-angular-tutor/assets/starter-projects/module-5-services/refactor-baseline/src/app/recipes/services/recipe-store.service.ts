import { Injectable, computed, inject, signal } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeApiService } from './recipe-api.service';

@Injectable({ providedIn: 'root' })
export class RecipeStoreService {
  private readonly api = inject(RecipeApiService);

  private readonly recipes = signal<Recipe[]>([]);
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
        this.recipes.set(recipes);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Unable to load recipes.');
        this.loading.set(false);
      },
    });
  }

  loadFeatured(): void {
    this.loading.set(true);
    this.error.set(null);

    this.api.fetchFeaturedRecipes().subscribe({
      next: (recipes) => {
        this.recipes.set(recipes);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Unable to load recipes.');
        this.loading.set(false);
      },
    });
  }
}

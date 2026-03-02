import { Component, inject } from '@angular/core';
import { RecipeStoreService } from '../services/recipe-store.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent {
  private readonly store = inject(RecipeStoreService);
  protected readonly vm = this.store.vm;

  protected reload(): void {
    this.store.load();
  }
}

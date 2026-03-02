import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  template: `
    <h3>Recipe Detail</h3>
    <p>Numeric id + 1: {{ numericId + 1 }}</p>
  `,
})
export class RecipeDetailComponent {
  private readonly route = inject(ActivatedRoute);

  // BUG: Number(null) and Number('alpha') produce invalid detail behavior.
  protected readonly numericId = Number(this.route.snapshot.paramMap.get('id'));
}

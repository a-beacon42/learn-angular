import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  template: `
    <h3>Recipe Detail</h3>
    <p>Route id: {{ route.snapshot.paramMap.get('id') }}</p>
  `,
})
export class RecipeDetailComponent {
  protected readonly route = inject(ActivatedRoute);
}

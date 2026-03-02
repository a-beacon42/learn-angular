import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  template: `
    <h3>Recipe Detail</h3>
    <p>Route id: {{ routeId() }}</p>
    <!-- TODO: guard invalid IDs and handle missing records. -->
  `,
})
export class RecipeDetailComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly routeId = computed(() => {
    return this.route.snapshot.paramMap.get('id') ?? 'unknown';
  });
}

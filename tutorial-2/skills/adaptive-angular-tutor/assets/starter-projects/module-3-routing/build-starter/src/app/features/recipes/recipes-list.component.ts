import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h2>Recipes</h2>
    <ul>
      <li><a [routerLink]="['/recipes', 1]">Recipe 1</a></li>
      <li><a [routerLink]="['/recipes', 2]">Recipe 2</a></li>
    </ul>
  `,
})
export class RecipesListComponent {}

import { Component, input } from '@angular/core';
import { RecipeModel } from '../models';

@Component({
  selector: 'app-recipe-card',
  imports: [],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
})
export class RecipeCard {
  recipe = input.required<RecipeModel>();
}

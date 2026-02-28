import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeModel } from '../models';

@Component({
  selector: 'app-recipe-card',
  imports: [RouterLink],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
})
export class RecipeCard {
  recipe = input.required<RecipeModel>();
  selected = output<number>();
}

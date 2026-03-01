import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeModel } from '../models';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-recipe-card',
  imports: [RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
})
export class RecipeCard {
  recipe = input.required<RecipeModel>();
  selected = output<number>();
}

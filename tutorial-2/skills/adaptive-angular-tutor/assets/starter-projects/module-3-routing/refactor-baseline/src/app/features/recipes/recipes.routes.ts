import { Routes } from '@angular/router';

const listLoader = () =>
  import('./recipes-list.component').then((m) => m.RecipesListComponent);
const detailLoader = () =>
  import('./recipe-detail.component').then((m) => m.RecipeDetailComponent);

export const RECIPE_ROUTES: Routes = [
  { path: '', loadComponent: listLoader },
  { path: ':id', loadComponent: detailLoader },
];

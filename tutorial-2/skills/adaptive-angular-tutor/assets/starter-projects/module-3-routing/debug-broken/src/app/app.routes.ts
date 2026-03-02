import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Home' }, // BUG: route mismatch casing.
  { path: '**', redirectTo: 'home' }, // BUG: wildcard placed too early.
  {
    path: 'recipes',
    loadChildren: () =>
      import('./features/recipe/recipes.routes').then((m) => m.RECIPE_ROUTES), // BUG: path typo.
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
];

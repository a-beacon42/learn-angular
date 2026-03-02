import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./features/recipes/recipes.routes').then((m) => m.RECIPE_ROUTES),
  },
  {
    path: 'recipes/featured',
    loadChildren: () =>
      import('./features/recipes/recipes.routes').then((m) => m.RECIPE_ROUTES),
  },
  { path: '**', redirectTo: 'home' },
];

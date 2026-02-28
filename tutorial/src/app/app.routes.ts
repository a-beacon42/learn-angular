import { Routes } from '@angular/router';
import { RecipeList } from './recipe-list/recipe-list';
import { RecipeDetail } from './recipe-detail/recipe-detail';

export const routes: Routes = [
    { path: '', component: RecipeList },
    { path: 'recipes/:recipeId', component: RecipeDetail },
];

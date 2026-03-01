import { Routes } from '@angular/router';
import { RecipeList } from './recipe-list/recipe-list';
import { RecipeDetail } from './recipe-detail/recipe-detail';
import { AddRecipe } from './add-recipe/add-recipe';

export const routes: Routes = [
    { path: '', component: RecipeList },
    { path: 'recipes/:recipeId', component: RecipeDetail },
    { path: 'add', component: AddRecipe },
];

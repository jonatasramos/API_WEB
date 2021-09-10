import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './pages/items/items.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CreateCategoriesComponent } from './pages/categories/create-categories/create-categories.component'
import { CreateItemsComponent } from './pages/items/create-items/create-items.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './helpers';

const routes: Routes = [
  { path: "", component: ItemsComponent, canActivate: [AuthGuard] },
  { path: "items", component: ItemsComponent },
  { path: "items/:id", component: CreateItemsComponent },
  { path: "categories", component: CategoriesComponent },
  { path: "categories/:id", component: CreateCategoriesComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

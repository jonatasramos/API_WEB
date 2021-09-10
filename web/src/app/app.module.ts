import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { ItemsComponent } from './pages/items/items.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { LoginComponent } from './pages/login/login.component';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateItemsComponent } from './pages/items/create-items/create-items.component';
import { CreateCategoriesComponent } from './pages/categories/create-categories/create-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    ItemsComponent,
    CategoriesComponent,
    LoginComponent,
    CreateItemsComponent,
    CreateCategoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    HttpClientModule,
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

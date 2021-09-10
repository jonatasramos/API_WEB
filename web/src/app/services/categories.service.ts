import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })

/**
 * Class CategoriesService
 *
 * @author Jônatas Ramos
 */
export class CategoriesService {
  public options: any;
  public env: any = environment;
  public api_route: string = `${this.env.apiUrl}/category`;

  constructor(private http: HttpClient) {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    this.options = { headers: headers };
  }

  /**
   * get Categories
   *
   * @returns categories
   */
  get(establishment_id: number): any {
    return this.http.get<any[]>(`${this.api_route}/establishment/${establishment_id}`).pipe(map(categories => {
      return categories;
    }));;
  }

  /**
   * get Category
   *
   * @returns category
   */
  show(id: number): any {
    return this.http.get<any[]>(`${this.api_route}/${id}`).pipe(map(category => {
      return category;
    }));;
  }

  /**
   * post category
   *
   * @param category
   * @returns new category
   */
  post(category: any): any {
    return this.http.post<any[]>(this.api_route, category, this.options).pipe(map(category => {
      return category;
    }));;
  }

  /**
   * put category
   *
   * @param category
   * @returns updated category
   */
   put(category: any, id: number): any {
    return this.http.put<any[]>(`${this.api_route}/${id}`, category, this.options).pipe(map(category => {
      return category;
    }));;
  }

  /**
   * delete category
   *
   * @param category
   * @returns deleted category
   */
   delete(id: number): any {
    return this.http.delete<any[]>(`${this.api_route}/${id}`, this.options).pipe(map(category => {
      return category;
    }));;
  }

}

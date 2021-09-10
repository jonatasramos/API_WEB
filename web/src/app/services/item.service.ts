import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })

/**
 * Class ItemService
 *
 * @author Jônatas Ramos
 */
export class ItemService {
  public options: any;
  public env: any = environment;
  public api_route: string = `${this.env.apiUrl}/item`;

  constructor(private http: HttpClient) {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    this.options = { headers: headers };
  }

  /**
   * get Items
   *
   * @returns item
   */
  get(establishment_id: number): any {
    return this.http.get<any[]>(`${this.api_route}/establishment/${establishment_id}`).pipe(map(item => {
      return item;
    }));;
  }

  /**
   * get Item
   *
   * @returns item
   */
  show(id: number): any {
    return this.http.get<any[]>(`${this.api_route}/${id}`).pipe(map(item => {
      return item;
    }));;
  }

  /**
   * post Item
   *
   * @param item
   * @returns new item
   */
  post(item: any): any {
    return this.http.post<any[]>(this.api_route, item, this.options).pipe(map(item => {
      return item;
    }));;
  }

  /**
   * put Item
   *
   * @param item
   * @returns updated item
   */
   put(item: any, id: number): any {
    return this.http.put<any[]>(`${this.api_route}/${id}`, item, this.options).pipe(map(item => {
      return item;
    }));;
  }

  /**
   * delete Item
   *
   * @param item
   * @returns deleted item
   */
   delete(id: number): any {
    return this.http.delete<any[]>(`${this.api_route}/${id}`, this.options).pipe(map(item => {
      return item;
    }));;
  }

}

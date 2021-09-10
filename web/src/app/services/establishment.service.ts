import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })

/**
 * Class EstablishmentService
 *
 * @author Jônatas Ramos
 */
export class EstablishmentService {
  public options: any;
  public env: any = environment;
  public api_route: string = `${this.env.apiUrl}/establishment`;

  constructor(private http: HttpClient) { }

  /**
   * get Establishments
   *
   * @returns establishment
   */
  get(): any {
    return this.http.get<any[]>(this.api_route).pipe(map(establishment => {
      return establishment;
    }));;
  }
}

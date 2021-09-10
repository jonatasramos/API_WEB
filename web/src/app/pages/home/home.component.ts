import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';
import { Router } from '@angular/router';
import { EstablishmentService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
/**
 * Class HomeComponent
 *
 * @author Jônatas Ramos
 */
export class HomeComponent implements OnInit {
  public establishment: any = [];
  public select: any = 0;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private establishmentService: EstablishmentService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('establishment_id')) {
      this.select = localStorage.getItem('establishment_id');
    }
    this.getItems();
  }

  /**
   * Returns component items
   *
   */
  getItems() {
    this.establishmentService.get().subscribe(data => this.establishment = data.establishment);
  }

  /**
   * Chaneg select establishment
   *
   */
  changeSelect() {
    localStorage.setItem('establishment_id', this.select);
    location.reload();
  }

  /**
   * Logout system
   */
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}

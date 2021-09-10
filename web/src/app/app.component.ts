import { Component } from '@angular/core';
import { AuthenticationService } from './services';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'web';
  currentUser: any = null;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.setUser();
  }

  async setUser() {
    await this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }
}

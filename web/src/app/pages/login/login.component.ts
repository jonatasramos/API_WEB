import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Class LoginComponent
 *
 * @author Jônatas Ramos
 */

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/items']);
    }
  }

  ngOnInit() {
    this.createForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/items';
  }

  /**
   * Create formBuilder
   *
   */
  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Submit Form
   *
   */
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe((data) => {
        this.router.navigate([this.returnUrl]);
      }, (error) => {
        this.error = "Usuário não encontrado!";
        this.loading = false;
      });
  }

  /**
   * Get form
   */
  get f() {
    return this.loginForm.controls;
  }
}

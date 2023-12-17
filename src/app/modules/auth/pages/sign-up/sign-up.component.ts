import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterLink, AngularSvgIconModule, ReactiveFormsModule, NgClass, NgIf],
})
export class SignUpComponent implements OnInit {
  submitted = false;
  form!: FormGroup;
  passwordTextType!: boolean;

  constructor(private readonly _formBuilder: FormBuilder, private _authService: AuthService, private _router: Router) {
    if (this._authService.getIsLoggedIn()) {
      this._router.navigate(['/dashboard'])
    }
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this._authService.register(this.form.value).subscribe(
      (response) => {
        // Handle successful login response here
        console.log(response); // Logging the response for demonstration
        this._router.navigate(['/dashboard']); // Navigate to dashboard upon successful login
      },
      (error) => {
        // Handle login error here
        console.error('Login failed:', error); // Logging the error for demonstration
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterLink],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private _authService: AuthService, private _router: Router) {
    if (this._authService.getIsLoggedIn()) {
      this._router.navigate(['/dashboard'])
    }
  }

  ngOnInit(): void {}
}

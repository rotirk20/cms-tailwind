import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterLink, AngularSvgIconModule],
})
export class NewPasswordComponent implements OnInit {
  constructor(private _authService: AuthService, private _router: Router) {
    if (this._authService.getIsLoggedIn()) {
      this._router.navigate(['/dashboard'])
    }
  }

  ngOnInit(): void {}
}

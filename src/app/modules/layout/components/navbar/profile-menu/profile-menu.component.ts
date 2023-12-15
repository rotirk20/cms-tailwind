import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
  standalone: true,
  imports: [ClickOutsideDirective, NgClass, RouterLink],
})
export class ProfileMenuComponent implements OnInit {
  public isMenuOpen = false;
  public userData: any;
  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this.userData = this._authService.getUser();
    console.log(this.userData)
  }

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  signOut() {
    this._authService.logout();
    this._router.navigate(['/auth']); // Navigate to dashboard upon successful login
  }
}

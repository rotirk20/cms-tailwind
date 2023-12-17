import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthService } from 'src/app/core/services/auth.service';
import { TableItemComponent } from 'src/app/shared/components/table-item/table-item.component';
import { User } from '../../../models/user';

@Component({
  selector: '[user-table]',
  standalone: true,
  imports: [AngularSvgIconModule, RouterLink, TableItemComponent, NgFor, NgClass],
  templateUrl: './user-table.component.html',
})
export class UserTableComponent implements OnInit {
  users: User[] = [];
  columns = [
    { name: "First name", field: "first_name" },
    { name: "Last name", field: "last_name" },
    { name: "Email", field: "email" },
    { name: "Action", field: "action" },
  ]
  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this._authService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    })
  }
}

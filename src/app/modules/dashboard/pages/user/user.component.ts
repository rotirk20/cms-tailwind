import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, AngularSvgIconModule],
  templateUrl: './user.component.html',
})
export class UserComponent {

}

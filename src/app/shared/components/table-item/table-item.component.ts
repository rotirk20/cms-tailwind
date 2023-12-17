import { Component, Input } from '@angular/core';
import { NgClass, NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterLink } from '@angular/router';
import { TableColumn } from '../../../shared/models/TableColumn';

@Component({
  selector: '[table-item]',
  standalone: true,
  imports: [NgFor, NgIf, NgSwitch, NgSwitchCase, AngularSvgIconModule, RouterLink, NgClass, NgSwitchDefault],
  templateUrl: './table-item.component.html',
  styleUrl: './table-item.component.scss'
})
export class TableItemComponent {
  @Input() rowData: any; // This will be the dynamic data passed to the component
  @Input() columns: TableColumn[] = []; // This will be an array of column names
}

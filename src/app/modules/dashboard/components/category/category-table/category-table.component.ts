import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterLink } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';
import { Category } from '../../../models/category';
import { CategoryService } from 'src/app/core/services/category.service';
import { TableItemComponent } from 'src/app/shared/components/table-item/table-item.component';

@Component({
  selector: '[category-table]',
  standalone: true,
  imports: [AngularSvgIconModule, RouterLink, NgFor, TableItemComponent, NgClass],
  templateUrl: './category-table.component.html',
})
export class CategoryTableComponent implements OnInit {
  categories: Category[] = [];
  columns = [
    { name: "Name", field: "name" },
    { name: "Description", field: "description" },
    { name: "Action", field: "action" },
  ]

  constructor(private _categoryService: CategoryService){}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this._categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

}

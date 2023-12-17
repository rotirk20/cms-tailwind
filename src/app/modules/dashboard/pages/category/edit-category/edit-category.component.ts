import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from '../../../components/category/category-form/category-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CategoryFormComponent],
  templateUrl: './edit-category.component.html',
})
export class EditCategoryComponent {
  categoryId: string = '';
  createForm!: FormGroup;
  category = <Category>{};
  error: boolean = false;
  success: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required], // Title field with required validation
      description: ['', Validators.required], // Content field with required validation
    });
  }

  ngOnInit() {
  }
}

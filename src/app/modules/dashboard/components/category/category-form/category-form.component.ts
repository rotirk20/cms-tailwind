import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe, NgIf, ViewportScroller } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../../models/category';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: '[category-form]',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, DatePipe],
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent {
  categoryId: string = '';
  @Input() formName = <FormGroup>{};
  @Input() formType = <string>"";
  category = <Category>{};
  error: boolean = false;
  success: boolean = false;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private formBuilder: FormBuilder, private viewportScroller: ViewportScroller) {
    this.formName = this.formBuilder.group(this.formName);
  }

  // Convenience getter for easy access to form controls in the template
  get f() {
    return this.formName.controls;
  }

  ngOnInit() {
    if (this.formType == 'edit') {
      this.route.params.subscribe((params: any) => (this.categoryId = params.id));
      this.getCategory();
    }
  }


  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  showSuccessMessage() {
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, 5000); // Hide after 5 seconds (5000 milliseconds)
  }

  getCategory() {
    this.categoryService.getCategory(this.categoryId).subscribe((category: Category) => {
      this.category = category;
      this.populateForm(category);
    });
  }

  populateForm(category: Category) {
    this.formName.patchValue(category);
  }

  showErrorMessage() {
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 5000); // Hide after 5 seconds (5000 milliseconds)
  }
  
  onSubmit(form: FormGroup) {
    if (form.valid) {
      const formData = form.value;
      if (this.formType == 'create') {
        this.categoryService.createCategory(formData).subscribe(
          (result: any) => {
            // Handle success
            this.showSuccessMessage();
            this.scrollToTop();
            // You can provide a success message or perform other actions here
          },
          (error: any) => {
            // Handle error
            this.showErrorMessage();
            this.scrollToTop();
            // You can display an error message or handle the error accordingly
          }
        );
      } else {
        this.categoryService.updateCategory(this.categoryId, formData).subscribe(
          (result: any) => {
            // Handle success
            this.showSuccessMessage();
            this.scrollToTop();
            // You can provide a success message or perform other actions here
          },
          (error: any) => {
            // Handle error
            this.showErrorMessage();
            this.scrollToTop();
            // You can display an error message or handle the error accordingly
          }
        );
      }
    }
  }
}

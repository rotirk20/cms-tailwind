import { Component, Input } from '@angular/core';
import { DatePipe, NgFor, NgIf, ViewportScroller } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostService } from 'src/app/core/services/post.service';
import { Post, SinglePost } from '../../../models/post';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from '../../../models/category';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: '[post-form]',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, NgIf, RouterLink, NgFor],
  templateUrl: './post-form.component.html',
})
export class PostFormComponent {
  postId: string = '';
  @Input() formName = <FormGroup>{};
  @Input() formType = <string>'';
  post = <SinglePost>{};
  error: boolean = false;
  success: boolean = false;
  categories: Category[] = [];
  selectedCategories: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private viewportScroller: ViewportScroller,
    private _categoryServ: CategoryService,
    private _authService: AuthService,
  ) {
    this.formName = this.formBuilder.group(this.formName);
  }

  // Convenience getter for easy access to form controls in the template
  get f() {
    return this.formName.controls;
  }

  ngOnInit() {
    this.getCategories();
    if (this.formType == 'edit') {
      this.route.params.subscribe((params: any) => (this.postId = params.id));
      this.getPost(this.postId);
    }
  }

  getCategories() {
    this._categoryServ.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  isCategorySelected(categoryId: string): boolean {
    return this.formName.value.categories.includes(categoryId);
  }

  showSuccessMessage() {
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, 5000); // Hide after 5 seconds (5000 milliseconds)
  }

  getPost(id: string) {
    this.postService.getPost(id).subscribe((post: SinglePost) => {
      this.post = post;
      this.selectedCategories = this.post.categories;
      this.populateForm(post);
    });
  }

  populateForm(postData: SinglePost) {
    this.formName.patchValue(postData);
  }

  showErrorMessage() {
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 5000); // Hide after 5 seconds (5000 milliseconds)
  }

  updateCategory(event: string) {
    if (!this.selectedCategories.includes(event)) {
      this.selectedCategories.push(event); // Add the event if it doesn't exist
    } else {
      const index = this.selectedCategories.indexOf(event);
      if (index > -1) {
        this.selectedCategories.splice(index, 1); // Remove the event if it exists
      }
    }
    this.formName.value.categories = this.selectedCategories;
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      const formData = form.value;
      const userInfo = this._authService.getUser() as any;
      formData.created_by = userInfo._id;
      if (this.formType == 'create') {
        this.postService.createPost(formData).subscribe(
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
          },
        );
      } else {
        this.postService.updatePost(this.postId, formData).subscribe(
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
          },
        );
      }
    }
  }
}

import { Component, Input } from '@angular/core';
import { DatePipe, NgIf, ViewportScroller } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostService } from 'src/app/core/services/post.service';
import { Post } from '../../../models/post';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: '[post-form]',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, NgIf, RouterLink],
  templateUrl: './post-form.component.html',
})
export class PostFormComponent {
  postId: string = '';
  @Input() formName = <FormGroup>{};
  @Input() formType = <string>"";
  post = <Post>{};
  error: boolean = false;
  success: boolean = false;

  constructor(private route: ActivatedRoute, private postService: PostService, private formBuilder: FormBuilder, private viewportScroller: ViewportScroller) {
    this.formName = this.formBuilder.group(this.formName);
  }

  // Convenience getter for easy access to form controls in the template
  get f() {
    return this.formName.controls;
  }

  ngOnInit() {
    if (this.formType == 'edit') {
      this.route.params.subscribe((params: any) => (this.postId = params.id));
      this.getPost(this.postId);
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

  getPost(id: string) {
    this.postService.getPost(id).subscribe((post: Post) => {
      this.post = post;
      this.populateForm(post);
    });
  }

  populateForm(postData: Post) {
    this.formName.patchValue(postData);
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
          }
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
          }
        );
      }
    }
  }
}

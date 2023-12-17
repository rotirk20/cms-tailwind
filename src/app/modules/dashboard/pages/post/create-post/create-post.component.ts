import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../../models/post';
import { PostFormComponent } from '../../../components/post/post-form/post-form.component';

@Component({
  selector: '[create-post]',
  standalone: true,
  imports: [PostFormComponent],
  templateUrl: './create-post.component.html',
})
export class CreatePostComponent {
  postId: string = '';
  createForm!: FormGroup;
  post = <Post>{};
  error: boolean = false;
  success: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required], // Title field with required validation
      content: ['', Validators.required], // Content field with required validation
      status: ['', Validators.required],
      categories: [[]],
      created_by: ['']
      // Add other form fields as needed
    });
  }

  ngOnInit() {
  }

}
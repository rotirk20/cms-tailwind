import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, NgIf } from '@angular/common';
import { PostFormComponent } from '../../../components/post/post-form/post-form.component';

@Component({
  selector: '[edit-post]',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, NgIf, RouterLink, PostFormComponent],
  templateUrl: './edit-post.component.html',
})
export class EditPostComponent implements OnInit {
  editForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      title: ['', Validators.required], // Title field with required validation
      content: ['', Validators.required], // Content field with required validation
      status: ['', Validators.required],
      categories: [[]],
      created_by: ['']
      // Add other form fields as needed
    });
  }

  ngOnInit(): void {
    
  }

}

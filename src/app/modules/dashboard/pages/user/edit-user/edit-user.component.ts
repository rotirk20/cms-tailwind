import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { UserFormComponent } from '../../../components/user/user-form/user-form.component';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent {
  createForm!: FormGroup;
  user = <User>{};
  error: boolean = false;
  success: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.createForm = this.formBuilder.group({
      first_name: ['', Validators.required], // Title field with required validation
      last_name: ['', Validators.required], // Content field with required validation
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }
}

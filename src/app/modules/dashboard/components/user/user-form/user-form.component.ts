import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../../models/user';

@Component({
  selector: '[user-form]',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  userId: string = '';
  @Input() formName = <FormGroup>{};
  @Input() formType = <string>'';
  user = <User>{};
  error: boolean = false;
  success: boolean = false;
  selectedCategories: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _authService: AuthService,
  ) {
    this.formName = this.formBuilder.group(this.formName);
  }

  // Convenience getter for easy access to form controls in the template
  get f() {
    return this.formName.controls;
  }

  ngOnInit() {
    if (this.formType == 'edit') {
      this.route.params.subscribe((params: any) => (this.userId = params.id));
      this.getUserById(this.userId);
    }
  }


  showSuccessMessage() {
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, 5000); // Hide after 5 seconds (5000 milliseconds)
  }

  getUserById(id: string) {
    this._authService.getUserById(id).subscribe((user: User) => {
      this.user = user;
      this.populateForm(user);
    });
  }

  populateForm(user: User) {
    this.formName.patchValue(user);
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
        this._authService.createUser(formData).subscribe(
          (result: any) => {
            // Handle success
            this.showSuccessMessage();
            // You can provide a success message or perform other actions here
          },
          (error: any) => {
            // Handle error
            this.showErrorMessage();
            // You can display an error message or handle the error accordingly
          },
        );
      } else {
        // this.postService.updatePost(this.postId, formData).subscribe(
        //   (result: any) => {
        //     // Handle success
        //     this.showSuccessMessage();
        //     this.scrollToTop();
        //     // You can provide a success message or perform other actions here
        //   },
        //   (error: any) => {
        //     // Handle error
        //     this.showErrorMessage();
        //     this.scrollToTop();
        //     // You can display an error message or handle the error accordingly
        //   },
        // );
      }
    }
  }
}

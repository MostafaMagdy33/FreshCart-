import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignUpService } from '../../../Shared/services/authentication/sign-up.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  isInVaild: boolean = false;
  isLoading: boolean = false;
  _SignUpService = inject(SignUpService);
  _Router = inject(Router);
  _ToastrService = inject(ToastrService);

  signUpForm:FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/gm),
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/gm),
      ]),
      phone: new FormControl(null, [Validators.pattern(/^01[1250]\d{8}$/gm)]),
    },
    this.ValidationForm


  );

  ValidationForm(f:any) {
    if (
      f.get('name').valid &&
      f.get('email').valid &&
      f.get('password').valid &&
      f.get('rePassword').valid &&
      f.get('phone').valid
    ) {
      return null;
    } else {
      return { FormError: true };
    }
  }

  clearInput() {
    this.signUpForm.reset();
  }

  SignUpApi(form: FormGroup): void {
    console.log(form);

    if (form.valid) {
      this.isLoading = true;
      this._SignUpService.singUp(form.value).subscribe({
        next: (res) => {
          this.isInVaild = false;
          this.isLoading = false;
          this._ToastrService.success('Account created successfully');
          this._Router.navigate(['/signIn']);
          this.clearInput();
        },
        error: (err) => {
          this.isInVaild = true;
          this.isLoading = false;
          console.info('SignUpApi' + err);
        },
      });
    }
  }
}

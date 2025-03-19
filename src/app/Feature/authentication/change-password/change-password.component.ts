import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ForgetPasswordService } from './../../../Shared/services/authentication/forget-password.service';
import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SignInService } from '../../../Shared/services/authentication/sign-in.service';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  _ForgetPasswordService = inject(ForgetPasswordService);
  _ToastrService = inject(ToastrService);
  _Router = inject(Router);
  _SignInService= inject(SignInService);
  isLoading: boolean = false;
  isInValid: boolean = false;

  changePasswordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/gm),
    ]),
    rePassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/gm),
    ]),
  });

  changePassword(form:FormGroup):void {
    if (form.valid) {
      this.isLoading = true;
      this._ForgetPasswordService
        .updateLoggeduserPassword(form.value)
        .subscribe({
          next: (response:object) => {
            localStorage.removeItem('UserToken');
            form.reset();
            this._Router.navigate(['/signIn']);
            this._SignInService.userName.next('');
            this.isInValid = false;
            this.isLoading = false;
            this._ToastrService.success('Your password has been changed');
          },
          error:(error) => {
            console.info('changePassword'+ error);
            this.isInValid = true;
            this.isLoading = false;
          },
        });
    }
  }
}

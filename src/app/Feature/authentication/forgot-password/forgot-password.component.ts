import { ForgetPasswordService } from './../../../Shared/services/authentication/forget-password.service';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector:'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl:'./forgot-password.component.html',
  styleUrl:'./forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  isLoading: boolean = false;
  isInValid: boolean = false;

  _Router = inject(Router);
  _ForgotPasswordService = inject(ForgetPasswordService);
  _ToastrService = inject(ToastrService);

  forgotPasswordForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  Forget(formPassword:FormGroup):void {
    if (formPassword.valid) {
      this.isLoading = true;
      this._ForgotPasswordService.ForgotPassword(formPassword.value).subscribe({
        next: (res:object) => {
          this.isLoading = false;
          this.isInValid = false;
          this._ToastrService.success('Reset code sent to your email');
          formPassword.reset();
          setTimeout(() => {
            this._Router.navigate(['/code']);
          }, 2000);
        },
        error: (err) => {
          this.isLoading = false;
          this.isInValid = true;
          console.info('forgotPassword' + err);
        },
      });
    }
  }
}

import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetPasswordService } from '../../../Shared/services/authentication/forget-password.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  isLoading: boolean = false;
  isInValid: boolean = false;
  isValid: boolean = false;

  _ForgetPasswordService = inject(ForgetPasswordService);
  _Router = inject(Router);
  _ToastrService = inject(ToastrService);

  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/gm),
    ]),
  });

  resetPasswordU(nP: FormGroup):void {
    if (nP.valid) {
      this._ForgetPasswordService.resetPassword(nP.value).subscribe({
        next: (res:object) => {
          this.isLoading = false;
          this.isInValid = false;
          this.isValid = true;
          this._ToastrService.success('Your password has been reset');
          nP.reset();
          setTimeout(() => {
            this._Router.navigate(['/signIn']);
          }, 2000);
        },
        error: (err) => {
          console.info('ForgetPassword' + err );
          this.isLoading = false;
          this.isInValid = true;
          this.isValid = false;
        },
      });
    }
  }
}

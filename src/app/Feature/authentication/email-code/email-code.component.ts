import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ForgetPasswordService } from '../../../Shared/services/authentication/forget-password.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-code',
  imports: [ReactiveFormsModule],
  templateUrl: './email-code.component.html',
  styleUrl: './email-code.component.scss',
})
export class EmailCodeComponent {
  isLoading: boolean = false;
  isInValid: boolean = false;
  isValid: boolean = false;

  _ForgetPasswordService = inject(ForgetPasswordService);
  _Router = inject(Router);
  _ToastrService = inject(ToastrService);

  codeForm:FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
  });

  verifyResetCode(code:FormGroup):void {
    if (code.valid) {
      this.isLoading = true;
      this._ForgetPasswordService.verifyCode(code.value).subscribe({
        next: (res:object) => {
          this.isLoading = false;
          this.isInValid = false;
          this.isValid = true;
          this._ForgetPasswordService.checkVerify.next(true);
          this._ToastrService.success('You have successfully verified codes');
          code.reset();
          setTimeout(() => {
            this._Router.navigate(['/resetPassword']);
          }, 2000);
        },
        error: (err) => {
          console.info('code'+ err);
          this.isLoading = false;
          this.isInValid = true;
          this.isValid = false;
          this._ForgetPasswordService.checkVerify.next(false);
          this._Router.navigate(['/forgetPassword']);

        },
      });
    }
  }
}

import { SignInService } from '../../../Shared/services/authentication/sign-in.service';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  isLoading: boolean = false;
  isInValid: boolean = false;
  _SignInService = inject(SignInService);
  _Router = inject(Router);
  _ToastrService = inject(ToastrService);

  signInForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/gm),
    ]),
  });

  clearInput():void {
    this.signInForm.reset();
  }

  signinApi(form: FormGroup):void {
    if (form.valid) {
      this._SignInService.isUserLogin.next(false);
      this.isLoading = true;
      this._SignInService.signIn(form.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.isInValid = false;
          this._ToastrService.success('Sign In successful');
          localStorage.setItem('UserToken', res.token);
          this._SignInService.isUserLogin.next(true);
          let tokenName: string = JSON.stringify(
            localStorage.getItem('UserToken')
          );
          let decode: any = jwtDecode(tokenName);
          this._SignInService.userName.next(decode.name);
          this._Router.navigate(['/home']);
          this.clearInput();
        },
        error: (err) => {
          this.isLoading = false;
          this.isInValid = true;
          console.info('signinApi' + err );
        },
      });
    }
  }
}

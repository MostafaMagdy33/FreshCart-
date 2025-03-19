import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contactus',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss',
})
export class ContactusComponent {
  contactUsForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    message: new FormControl(null, [Validators.required]),
  });

  async postData(form: FormGroup) {
    let response = await emailjs
      .send(
        'service_x289v3g',
        'template_8rbgvu3',
        { ...form.value },
        {
          publicKey: 'aRG4zYPxeo-qpMGH_',
        }
      )
      .then(
        () => {
          form.reset(); // Reset form after success
        },
        (error) => {
          console.info('FAILED...', (error as EmailJSResponseStatus).text);
        }
      );
  }
}

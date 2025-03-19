import { Component } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
@Component({
  selector: 'app-loading',
  imports: [NgxSpinnerModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {}

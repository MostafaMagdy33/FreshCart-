import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AddToCartService } from './../../../Shared/services/AddToCart/add-to-cart.service';
import { Component, inject } from '@angular/core';
import { cartData, Product } from '../../../addtocart';
import { CurrencyPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CheckoutService } from '../../../Shared/services/checkOut/checkout.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, FormsModule, CurrencyPipe, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  _AddToCartService = inject(AddToCartService);
  _ActivatedRoute = inject(ActivatedRoute);
  _CheckoutService = inject(CheckoutService);
  _Router = inject(Router);
  _ToastrService = inject(ToastrService);

  ProductCart: Subscription = new Subscription();
  allProductCart!: Product[];
  cartPro!: cartData;
  btnVisa: boolean = false;
  btnCash: boolean = false;
  btn: boolean = true;

  ngOnInit(): void {
    this.getUserCart();
  }

  getUserCart():void {

      this.ProductCart = this._AddToCartService.getLoggedUserCart().subscribe({
        next: (response) => {
          this.cartPro = response;
          this.allProductCart = response.data.products;
        },
        error: (error) => {
          console.info('getCartData', error);
        },
      });

  }

  checkOutForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[1250]\d{8}$/gm),
    ]),
    city: new FormControl(null, [Validators.required]),
  });

  paymentVisa(form: FormGroup):void {
    if (form.valid) {
      let cartId = this._ActivatedRoute.snapshot.params?.['id'];
      this._CheckoutService.getCheckOutVisa(cartId, form.value).subscribe({
        next: (request) => {
          console.log(request);
          this.checkOutForm.reset();
          location.href = request.session.url;
        },
      });
    }
  }
  paymentCash(form: FormGroup):void {
    if (form.valid) {
      let cartId = this._ActivatedRoute.snapshot.params?.['id'];
      this._CheckoutService.getCheckOutCash(cartId, form.value).subscribe({
        next: (request) => {
          console.log(request);
          this.checkOutForm.reset();
          this._ToastrService.success(
            'Payment Successful Thank you for your purchase.'
          );

          setTimeout(() => {
            this._Router.navigate(['/allorders']);
          }, 2000);
        },
        error: (error) => {
          console.info('paymentCash', error);
        },
      });
    }
  }
  clickVisa():void  {
    this.btnVisa = true;
    this.btn = false;
    this.btnCash = false;
  }
  clickCash():void  {
    this.btnCash = true;
    this.btn = false;
    this.btnVisa = false;
  }

  ngOnDestroy(): void {
    this.ProductCart.unsubscribe();
  }
}

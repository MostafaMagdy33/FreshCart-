import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { AddToCartService } from './../../../Shared/services/AddToCart/add-to-cart.service';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { cartData, Product } from '../../../addtocart';
import { LoadingComponent } from '../../../Shared/componnent/loading/loading.component';
import { EmptyCartComponent } from '../../../Shared/componnent/empty-cart/empty-cart.component';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../../Shared/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, LoadingComponent, EmptyCartComponent, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  _AddToCartService = inject(AddToCartService);
  _ToastrService = inject(ToastrService);
  _WishlistService = inject(WishlistService);
  _PLATFORM_ID = inject(PLATFORM_ID);
  _Router = inject(Router);

  useraddToWishList: { [key: string]: boolean } = {};
  userCartData!: cartData;
  cartProducts!: Product[];
  updateLoading: { [key: string]: Boolean } = {};
  cartLoading: Boolean = false;
  wishListData: string[] = [];

  productCarSubscribe: Subscription = new Subscription();
  wishListSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.getCartData();
    this.getWishListUserLogged();
  }

  getWishListUserLogged():void {
    this.wishListSubscription = this._WishlistService
      .getLoggedUserWishList()
      .subscribe({
        next: (response) => {
          this._WishlistService.numofWishList.set(response.count);
          const newdata = response.data.map((item: any) => item._id);
          this.wishListData = newdata;
        },
      });
  }

  clickAddToWishList(id: string): void {
    this._WishlistService.addToWishlist(id).subscribe({
      next: (response) => {
        this.getWishListUserLogged()
        this.useraddToWishList[id] = true;
        this._ToastrService.success(
          'Product successfully added to your WishList'
        );
      },
      error: (error) => {
        this.useraddToWishList[id] = false;
        this._Router.navigate(['/signIn']);
        console.info('Error AddToCart:', error );
      },
    });
  }

  clickRemoveToWishList(wId: string): void {
    this._WishlistService.removeProductFromWishList(wId).subscribe({
      next: (response) => {
        this.getWishListUserLogged()
        this._ToastrService.error('Removed the product from wishlist');
      },
      error: (error) => {
        console.info('removeItem', error);
      },
    });
  }

  getCartData():void {
      this.cartLoading = true;
      this.productCarSubscribe = this._AddToCartService
        .getLoggedUserCart()
        .subscribe({
          next: (response) => {
            this.userCartData = response;
            this.cartProducts = response.data.products;
            this.cartLoading = false;
            this._AddToCartService.numOfCartItemsUser.set(response.numOfCartItems)
          },
          error: (error) => {
            console.info('getCartData', error);
            this.cartLoading = false;
          },
        });
  }

  updateCart(id: string, count: number) {
    this.updateLoading[id] = true;
    this._AddToCartService.UpdateCartProductQuantity(id, count).subscribe({
      next: (response) => {
        this.updateLoading[id] = false;
        this.userCartData = response;
        this.cartProducts = response.data.products;
        this._AddToCartService.numOfCartItemsUser.set(response.numOfCartItems)
      },
      error: (error) => {
        this.updateLoading[id] = false;
        console.info('UpdateCart', error);
      },
    });
  }

  removeCartItem(id: string):void {
    this._AddToCartService.removeItem(id).subscribe({
      next: (response) => {
        this.userCartData = response;
        this.cartProducts = response.data.products;
        this._AddToCartService.numOfCartItemsUser.set(response.numOfCartItems)
      },
      error: (error) => {
        console.info('removeItem', error);
      },
    });
  }

  ngOnDestroy(): void {
    this.productCarSubscribe.unsubscribe();
    this.wishListSubscription.unsubscribe();
  }
}

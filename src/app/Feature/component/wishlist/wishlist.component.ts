import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { WishlistService } from '../../../Shared/services/wishlist/wishlist.service';
import { WishList, Daum } from '../../../wish-list';
import { AddToCartService } from '../../../Shared/services/AddToCart/add-to-cart.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingComponent } from '../../../Shared/componnent/loading/loading.component';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe, RouterLink, LoadingComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  _WishlistService = inject(WishlistService);
  _AddToCartService = inject(AddToCartService);
  _Router = inject(Router);
  _ToastrService = inject(ToastrService);

  productWishListSubscribe: Subscription = new Subscription();
  productCarSubscribe: Subscription = new Subscription();
  itemLoadingStatus: { [key: string]: boolean } = {};
  userWishListData!: WishList;
  wishListProducts: Daum[] = [];

  ngOnInit(): void {
    this.getWishListData();
    this.getCartData();
  }

  getCartData(): void {
    this.productCarSubscribe = this._AddToCartService
      .getLoggedUserCart()
      .subscribe({
        next: (response) => {
          this._AddToCartService.numOfCartItemsUser.set(
            response.numOfCartItems
          );
        },
        error: (error) => {
          console.info('getCartData', error);
        },
      });
  }

  getWishListData() {
    this.productWishListSubscribe = this._WishlistService
      .getLoggedUserWishList()
      .subscribe({
        next: (response) => {
          this.userWishListData = response;
          this.wishListProducts = response.data;
          this._WishlistService.numofWishList.set(response.count);
        },
        error: (error) => {
          console.error('getWishListData', error);
        },
      });
  }

  clickAddToCart(id: string): void {
    this.itemLoadingStatus[id] = true;
    this._AddToCartService.addToCart(id).subscribe({
      next: (request) => {
        this.getCartData();
        this.itemLoadingStatus[id] = false;
        this._ToastrService.success(
          'Product successfully added to your shopping cart'
        );
      },
      error: (error) => {
        this.itemLoadingStatus[id] = false;
        this._Router.navigate(['/signIn']);
        console.info('Error AddToCart:', error);
      },
    });
  }

  removeWishListItem(wId: string): void {
    this._WishlistService.removeProductFromWishList(wId).subscribe({
      next: (response) => {
        this.getWishListData();
      },
      error: (error) => {
        console.info('removeItem', error);
      },
    });
  }

  ngOnDestroy(): void {
    this.productWishListSubscribe.unsubscribe();
    this.productCarSubscribe.unsubscribe();
  }
}

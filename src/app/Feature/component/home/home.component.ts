import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CarouselHomeComponent } from '../carousel-home/carousel-home.component';
import { AddToCartService } from '../../../Shared/services/AddToCart/add-to-cart.service';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../../Shared/services/wishlist/wishlist.service';

@Component({
  selector: 'app-home',
  imports: [CarouselHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  _AddToCartService = inject(AddToCartService);
  productCarSubscribe: Subscription = new Subscription();
  wishListSubscription: Subscription = new Subscription();
  _WishlistService = inject(WishlistService);

  ngOnInit(): void {
    this.getCartData();
    this.getwishUserLogged();
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

  getwishUserLogged(): void {
    this.wishListSubscription = this._WishlistService
      .getLoggedUserWishList()
      .subscribe({
        next: (response) => {
          this._WishlistService.numofWishList.set(response?.count);
        },
      });
  }
  ngOnDestroy(): void {
    this.productCarSubscribe.unsubscribe();
    this.wishListSubscription.unsubscribe();
  }
}

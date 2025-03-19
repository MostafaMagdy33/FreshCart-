import { product } from './../../../product';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { AllProductService } from '../../../Shared/services/product/all-product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddToCartService } from '../../../Shared/services/AddToCart/add-to-cart.service';
import { SignInService } from '../../../Shared/services/authentication/sign-in.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../Shared/services/wishlist/wishlist.service';

@Component({
  selector: 'app-specific-product',
  imports: [RouterLink],
  templateUrl: './specific-product.component.html',
  styleUrl: './specific-product.component.scss',
})
export class SpecificProductComponent {
  _AllProductService = inject(AllProductService);
  _ActivatedRoute = inject(ActivatedRoute);
  _AddToCartService = inject(AddToCartService);
  _SignInService = inject(SignInService);
  _ToastrService = inject(ToastrService);
  _WishlistService = inject(WishlistService);
  _PLATFORM_ID = inject(PLATFORM_ID);
  _Router = inject(Router);

  useraddToWishList: { [key: string]: boolean } = {};
  product!: product;
  productSubscribe: Subscription = new Subscription();
  addCartLoding: boolean = false;
  checkUserSignInS: boolean = this._SignInService.isUserLogin.value;
  wishListData: any[] = [];

  wishListSubscription: Subscription = new Subscription();
  productCarSubscribe: Subscription = new Subscription();
  ngOnInit(): void {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    this._ActivatedRoute.paramMap.subscribe(() => {
      this.getProductData(this._ActivatedRoute.snapshot.params['id']);
    });

    this.getWishListUserLogged();
    this.getCartData();
  }

  getWishListUserLogged() {
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
      next: (request) => {
        this.getWishListUserLogged();

        this.useraddToWishList[id] = true;
        this._ToastrService.success(
          'Product successfully added to your WishList'
        );
      },
      error: (error) => {
        this.useraddToWishList[id] = false;
        this._Router.navigate(['/signIn']);
        console.info('Error AddToCart:', error);
      },
    });
  }

  clickRemoveToWishList(wid: string): void {
    this._WishlistService.removeProductFromWishList(wid).subscribe({
      next: (response) => {
        this._ToastrService.error('Removed the product from wishlist');

        this.getWishListUserLogged();
      },
      error: (error) => {
        console.info('removeItem', error);
      },
    });
  }

  getProductData(id: string): void {
    this.productSubscribe = this._AllProductService
      .getSpecificProduct(id)
      .subscribe({
        next: (response) => {
          this.product = response.data;
        },
        error: (error) => console.info(error),
      });
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

  clickAddToCart(id: string): void {
    this.addCartLoding = true;
    this._AddToCartService.addToCart(id).subscribe({
      next: (request) => {
        this.addCartLoding = false;
        this._ToastrService.success(
          'Product successfully added to your shopping cart'
        );
        this.getCartData();
      },
      error: (error) => {
        console.info('Error AddToCart:', error);
        this.addCartLoding = false;
      },
    });
  }

  changeImage(e: MouseEvent): void {
    const target = e.target as HTMLImageElement;
    if (target?.src) {
      document
        .querySelector<HTMLImageElement>('#mainImage')
        ?.setAttribute('src', target.src);
    }
  }

  ngOnDestroy(): void {
    this.productSubscribe.unsubscribe();
    this.wishListSubscription.unsubscribe();
    this.productCarSubscribe.unsubscribe();
  }
}

import { Category, product } from './../../../product';
import { AllProductService } from './../../../Shared/services/product/all-product.service';
import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingComponent } from '../../../Shared/componnent/loading/loading.component';
import { RouterLink, Router } from '@angular/router';
import { CarouselCategoriesComponent } from '../carousel-categories/carousel-categories.component';
import { AddToCartService } from '../../../Shared/services/AddToCart/add-to-cart.service';
import { SignInService } from '../../../Shared/services/authentication/sign-in.service';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../Shared/services/wishlist/wishlist.service';
import { CarouselBrandsComponent } from '../carousel-brands/carousel-brands.component';

@Component({
  selector: 'app-product',
  imports: [
    LoadingComponent,
    RouterLink,
    CarouselCategoriesComponent,
    CurrencyPipe,
    CarouselBrandsComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  _AllProductService = inject(AllProductService);
  _AddToCartService = inject(AddToCartService);
  _SignInService = inject(SignInService);
  _WishlistService = inject(WishlistService);
  _Router = inject(Router);
  _ToastrService = inject(ToastrService);


  itemLoadingStatus: { [key: string]: boolean } = {};
  useraddToWishList: { [key: string]: boolean } = {};
  productSubscribe: Subscription = new Subscription();
  CategoriesSubscribe: Subscription = new Subscription();
  wishListSubscription: Subscription = new Subscription();
  productCarSubscribe: Subscription = new Subscription();
  productsData!: product[];
  categoryData!: Category[];
  wishListData: any[] = [];
  addCartLoding: boolean = false;

  ngOnInit(): void {
    this.getData();
    this.getCategories();
    this.getCartData();
    this.getwishUserLogged();
  }

  getwishUserLogged(): void {
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

  getData(): void {
    this.productSubscribe = this._AllProductService.getAllProducts().subscribe({
      next: (response) => {
        this.productsData = response.data;
      },
      error: (error) => {
        console.info('Error product:', error);
      },
    });
  }
  getCategories(): void {
    this.CategoriesSubscribe = this._AllProductService
      .getAllCagtegories()
      .subscribe({
        next: (response) => {
          this.categoryData = response.data;
        },
        error: (error) => {
          console.info('Error Categories:', error);
        },
      });
  }
  clickAddToCart(id: string): void {
    this.itemLoadingStatus[id] = true;
    this._AddToCartService.addToCart(id).subscribe({
      next: (response) => {
        this.getCartData();
        this.itemLoadingStatus[id] = false;
        this._ToastrService.success(
          'Product successfully added to your shopping cart'
        );
      },
      error: (error) => {
        this.itemLoadingStatus[id] = false;
        this._ToastrService.info('Sign in First');
        this._Router.navigate(['/signIn']);
        console.info('Error AddToCart:', error);
      },
    });
  }
  clickAddToWishList(id: string): void {
    this._WishlistService.addToWishlist(id).subscribe({
      next: (request) => {
        this.getwishUserLogged();
        this.useraddToWishList[id] = true;
        this._ToastrService.success('Product successfully added to your WishList');
      },
      error: (error) => {
        this.useraddToWishList[id] = false;
        this._ToastrService.info('Sign in First');
        this._Router.navigate(['/signIn']);
        console.info('Error addToWishlist:', error);
      },
    });
  }

  clickRemoveToWishList(wid: string): void {
    this._WishlistService.removeProductFromWishList(wid).subscribe({
      next: (response) => {
        this.getwishUserLogged();
        this._ToastrService.error('Removed the product from wishlist');
      },
      error: (error) => {
        console.info('removeItem', error);
      },
    });
  }

  ngOnDestroy(): void {
    this.productSubscribe.unsubscribe();
    this.CategoriesSubscribe.unsubscribe();
    this.wishListSubscription.unsubscribe();
    this.productCarSubscribe.unsubscribe();
  }
}

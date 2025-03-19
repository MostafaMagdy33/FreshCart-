import { Category, product } from './../../../product';
import { AllProductService } from './../../../Shared/services/product/all-product.service';
import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingComponent } from '../../../Shared/componnent/loading/loading.component';
import { RouterLink, Router } from '@angular/router';
import { AddToCartService } from '../../../Shared/services/AddToCart/add-to-cart.service';
import { SignInService } from '../../../Shared/services/authentication/sign-in.service';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../Shared/services/wishlist/wishlist.service';
import { CategoriesPipe } from '../../../Core/pipe/categories.pipe';

@Component({
  selector: 'app-categories',
  imports: [RouterLink, CurrencyPipe, CategoriesPipe, LoadingComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})

export class CategoriesComponent {
  _AllProductService = inject(AllProductService);
  _AddToCartService = inject(AddToCartService);
  _SignInService = inject(SignInService);
  _WishlistService = inject(WishlistService);
  _Router = inject(Router);
  _ToastrService = inject(ToastrService);

  itemLoadingStatus: { [key: string]: boolean } = {};
  useraddToWishList: { [key: string]: boolean } = {};
  CategoriesSubscribe: Subscription = new Subscription();
  wishListSubscription: Subscription = new Subscription();
  productSubscribe: Subscription = new Subscription();
  productCarSubscribe: Subscription = new Subscription();
  productsData!: product[];
  wishListData: string[] = [];
  addCartLoding: boolean = false;
  categoryData: Category[] = [];
  categoryName: string = '';

  ngOnInit(): void {
    this.getData();
    this.getCategories();
    this.getCartData()
  }

  getCategories() {
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

  getWishListData(): void {
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

  getData() {
    this.productSubscribe = this._AllProductService.getAllProducts().subscribe({
      next: (response) => {
        this.productsData = response.data;
      },
      error: (error) => {
        console.info('Error product:', error);
      },
    });
  }

  clickAddToCart(id: string) {
    this.itemLoadingStatus[id] = true;
    this._AddToCartService.addToCart(id).subscribe({
      next: (request) => {
        console.log(request);
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
  clickAddToWishList(id: string) {
    this._WishlistService.addToWishlist(id).subscribe({
      next: (request) => {
        console.log(request);
        this.getWishListData();
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

  clickRemoveToWishList(wid: string) {
    this._WishlistService.removeProductFromWishList(wid).subscribe({
      next: (response) => {
        console.log(response);
        this.getWishListData();
        this._ToastrService.error('Removed the product from wishlist');
      },
      error: (error) => {
        console.info('removeItem', error);
      },
    });
  }

  clickToGetCategoryName(e:MouseEvent):void {
   const target = e.target as HTMLElement;
  if (target) {
    this.categoryName = target.textContent?.trim() || "";
    console.log(this.categoryName);
  }
  }

  ngOnDestroy(): void {
    this.productSubscribe.unsubscribe();
    this.CategoriesSubscribe.unsubscribe();
    this.wishListSubscription.unsubscribe();
    this.productCarSubscribe.unsubscribe();
  }
}

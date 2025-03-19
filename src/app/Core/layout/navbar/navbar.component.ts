import { SignInService } from './../../../Shared/services/authentication/sign-in.service';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AddToCartService } from '../../../Shared/services/AddToCart/add-to-cart.service';
import { SearchboxComponent } from "../../../Feature/component/searchbox/searchbox.component";
import { WishlistService } from '../../../Shared/services/wishlist/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, SearchboxComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  _AddToCartService = inject(AddToCartService)
  _Router = inject(Router);
  _SignInService = inject(SignInService);
  _WishlistService = inject(WishlistService);

  numOfCart:any = 0;
  numOfFavv: any = 0;
  navbarLogin: boolean = false;
  userNameToken!:string;

  ngOnInit():void {
    this._SignInService.isUserLogin.subscribe(
      (data:boolean) => {
        this.navbarLogin = data;
      })
    this._SignInService.userName.subscribe({
      next: (data:string) => {
        this.numOfCart = computed(() => {
          return this._AddToCartService.numOfCartItemsUser();
        })
        this.numOfFavv = computed(() => {
          return this._WishlistService.numofWishList();
        })
        this.userNameToken = data;
      }
    })

  }

  logOut() {
    localStorage.removeItem('UserToken')
    setTimeout(() => {
      this._Router.navigate(['/signIn'])
    }, 1000)
    this._SignInService.isUserLogin.next(false);
    this._AddToCartService.numOfCartItemsUser.set(0);
    this._WishlistService.numofWishList.set(0);
    this.userNameToken ='';
  }

}

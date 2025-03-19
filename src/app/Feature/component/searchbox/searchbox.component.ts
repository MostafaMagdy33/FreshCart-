import { product } from './../../../product';
import { AllProductService } from './../../../Shared/services/product/all-product.service';
import {
  Component,
  inject,
  NgZone
} from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterLink, Router } from '@angular/router';
import { AddToCartService } from '../../../Shared/services/AddToCart/add-to-cart.service';
import { SignInService } from '../../../Shared/services/authentication/sign-in.service';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../Core/pipe/search.pipe';


@Component({
  selector: 'app-searchbox',
  imports: [CurrencyPipe, RouterLink, FormsModule, SearchPipe],
  templateUrl: './searchbox.component.html',
  styleUrl: './searchbox.component.scss',
})
export class SearchboxComponent {
  _AllProductService = inject(AllProductService);
  _AddToCartService = inject(AddToCartService);
  _SignInService = inject(SignInService);
  _Router = inject(Router);
  _ToastrService = inject(ToastrService);


  searchValue: string = '';
  itemLoadingStatus: { [key: string]: boolean } = {};
  productSubscribe: Subscription = new Subscription();
  productsData!: product[];
  addCartLoding: boolean = false;

  ngOnInit(): void {
    this.getData();
  }
  getData():void {
    this.productSubscribe = this._AllProductService.getAllProducts().subscribe({
      next: (response) => {
        this.productsData = response.data;
      },
      error: (error) => {
        console.info('Error product:', error);
      },
    });
  }


  clickAndClose() :void{
    let modalF = document.getElementById('default-modal');
    let divNan = document.querySelector('.z-40');
    let body = document.querySelector('body');
    body?.classList.remove('overflow-hidden');
    divNan?.classList.remove('fixed');
    if (modalF?.classList.contains('hidden')) {
      modalF?.classList.replace('hidden', 'flex');
    } else {
      modalF?.classList.replace('flex', 'hidden');
    }
  }

  ngOnDestroy(): void {
    this.productSubscribe.unsubscribe();
  }
}

import { Subscription } from 'rxjs';
import { Brand } from '../../../product';
import { BrandService } from './../../../Shared/services/brand/brand.service';
import { Component, inject } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel-brands',
  imports: [CarouselModule],
  templateUrl: './carousel-brands.component.html',
  styleUrl: './carousel-brands.component.scss',
})
export class CarouselBrandsComponent {
  _BrandService = inject(BrandService);

  customOptions: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 5,
      },
    },
    nav: false,
  };

  brandsSubscription: Subscription = new Subscription();
  brandsData: Brand[] = [];

  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands(): void {
    this.brandsSubscription = this._BrandService.getAllBrand().subscribe({
      next: (response) => {
        this.brandsData = response.data;
      },
      error: (error) => {
        console.info('getAllBrands' + error);
      },
    });
  }
  ngOnDestroy(): void {
    this.brandsSubscription.unsubscribe();
  }
}

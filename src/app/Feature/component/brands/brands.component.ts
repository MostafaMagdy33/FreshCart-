import { Subscription } from 'rxjs';
import { Brand } from '../../../product';
import { BrandService } from './../../../Shared/services/brand/brand.service';
import { Component, inject } from '@angular/core';
import { LoadingComponent } from '../../../Shared/componnent/loading/loading.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink, LoadingComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  _BrandService = inject(BrandService);
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

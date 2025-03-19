import { Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Category } from '../../../product';

@Component({
  selector: 'app-carousel-categories',
  imports: [CarouselModule],
  templateUrl: './carousel-categories.component.html',
  styleUrl: './carousel-categories.component.scss',
})
export class CarouselCategoriesComponent {
  @Input() CategoriesApi!: Category[];

  customOptions: OwlOptions = {
    loop: true,
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
}

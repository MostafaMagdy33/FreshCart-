import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselBrandsComponent } from '../carousel-brands/carousel-brands.component';
@Component({
  selector: 'app-carousel-home',
  imports: [CarouselModule, RouterLink, CarouselBrandsComponent],
  templateUrl: './carousel-home.component.html',
  styleUrl: './carousel-home.component.scss',
})
export class CarouselHomeComponent {
  customOptions: OwlOptions = {
    loop: true,
    margin: 30,
    stagePadding: 50,
    center: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoHeight: true,
    autoWidth: true,
    dots: false,
    navSpeed: 10,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };
}

import { product } from './../../product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categories'
})
export class CategoriesPipe implements PipeTransform {

  transform(products:product[], CategoryName:string): product[] {
    return products?.filter((product) => product?.category.name === CategoryName);
  }

}

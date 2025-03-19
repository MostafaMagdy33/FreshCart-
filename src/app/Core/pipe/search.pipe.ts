import { product } from './../../product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:product[] ,searchWord:string){
   return products?.filter((product)=>{
      return product.title.toLowerCase().includes(searchWord.toLowerCase());
    })

  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 'seller') {
      return 'فروشنده';
    } else if (value === 'buyer') {
      return 'خریدار';
    } else if (value === 'admin') {
      return 'ادمین'; 
    }
    else { return 'ناشناس'; }

  }

}

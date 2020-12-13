import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({
  name: 'jalali'
})
export class JalaliPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    moment.locale('fa', { useGregorianParser: true });
    return (moment(value).format('YYYY/MM/DD'));
  }
}

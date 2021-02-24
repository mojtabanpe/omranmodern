import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayPast'
})
export class DayPastPipe implements PipeTransform {

  transform(value: Date, args?: any): any {
    value = new Date(value);
    const dateNow = new Date();
    const DifferenceInTime = dateNow.getTime() - value.getTime();
    const DifferenceInDays = Math.floor(DifferenceInTime / (1000 * 3600 * 24));
    if (DifferenceInDays === 1) {
      return 'دیروز';
    } else {
      return DifferenceInDays + ' روز پیش';
    }
  }

}

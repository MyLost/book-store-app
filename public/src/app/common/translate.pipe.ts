import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'translatePipe'
})
export class TranslatePipe implements PipeTransform {

  transform(value: any, args?: any) {
   return value;
  }

}

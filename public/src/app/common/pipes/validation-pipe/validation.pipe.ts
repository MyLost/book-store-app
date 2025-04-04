import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validation',
  standalone: true
})
export class ValidationPipe implements PipeTransform {

  transform(value: any, errorObj: Object) {
    return value[Object.keys(errorObj)[0]];
  }
}
